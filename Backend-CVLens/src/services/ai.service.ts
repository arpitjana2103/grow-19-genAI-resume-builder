import { GoogleGenAI } from "@google/genai";
import puppeteer from "puppeteer";
import * as z from "zod";

import { runningOnProduction } from "../configs/app.config.js";
import { HTTPSTATUSCODE } from "../configs/http.config.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { AppError } from "../utils/errors/app-error.util.js";
import { InterViewReportAIResponseSchema, ResumePdfSchema } from "../validations/ai.validation.js";
import { generateInterviewReportPrompt, generateResumePdfPrompt } from "./ai.prompts.js";

// new GoogleGenAI({
//     apiKey: config.GEMINI_API_KEY,
// })
const client = new GoogleGenAI({});
const models = {
    limitUnknown: "gemini-3.1-flash-lite-preview",
    limitmax: "gemini-3.1-flash-lite",
    limitmin: "gemini-3.5-flash",
};

export const generateInterviewReport = async function ({
    resume,
    selfDescription,
    jobDescription,
}: {
    resume: string;
    selfDescription: string;
    jobDescription: string;
}) {
    const prompt = generateInterviewReportPrompt({ resume, selfDescription, jobDescription });

    try {
        const interaction = await client.interactions.create({
            model: models.limitmax,
            input: prompt,
            response_format: {
                type: "text",
                mime_type: "application/json",
                schema: z.toJSONSchema(InterViewReportAIResponseSchema),
            },
        });

        const report = InterViewReportAIResponseSchema.parse(JSON.parse(interaction.output_text!));
        return report;
    } catch (error: any) {
        if (error?.status === 429) {
            throw new AppError({
                publicMessage:
                    "Our AI Service is currently experiencing high traffic. Please try again in a few moments.",
                internalMessage: error.message,
                statusCode: HTTPSTATUSCODE.TOO_MANY_REQUESTS,
                errorCode: ErrorCodeEnum.RATE_LIMIT_EXCEEDED,
            });
        }
        // Catch-all for other AI integration errors
        throw new AppError({
            publicMessage: "Failed to generate the interview report. Please try again later.",
            internalMessage: error?.message || "Unknown error occurred while contacting GenAI",
            statusCode: HTTPSTATUSCODE.INTERNAL_SERVER_ERROR,
            errorCode: ErrorCodeEnum.EXTERNAL_SERVICE_ERROR,
        });
    }
};

async function generatePdfFromHtml(htmlContent: string) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            // Safe on all platforms (Windows, Linux, Docker, Render)
            "--no-sandbox",
            "--disable-setuid-sandbox",

            // CRITICAL for Render: /dev/shm is only 64MB on Render vs 2GB locally.
            // Chrome uses /dev/shm by default for temp files — causes OOM crashes without this.
            "--disable-dev-shm-usage",

            // Safe memory-saving flags (work on all platforms)
            "--disable-gpu",
            "--no-first-run",

            // Linux/Docker ONLY flags — reduce memory on Render free tier.
            // DO NOT use on Windows: they disable Chrome's multi-process renderer architecture,
            // causing TargetCloseError crashes when printing PDF.
            ...(runningOnProduction() ? ["--no-zygote", "--single-process"] : []),
        ],
    });

    try {
        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "load",
        });

        await page.waitForNetworkIdle();

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "10mm",
                bottom: "10mm",
                left: "10mm",
                right: "10mm",
            },
        });

        return Buffer.from(pdfBuffer);
    } finally {
        await browser.close();
    }
}

export async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
}: {
    resume: string;
    selfDescription: string;
    jobDescription: string;
}) {
    const prompt = generateResumePdfPrompt({ resume, selfDescription, jobDescription });

    const interaction = await client.interactions.create({
        model: models.limitmax,
        input: prompt,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: z.toJSONSchema(ResumePdfSchema),
        },
    });

    const jsonContent = ResumePdfSchema.parse(JSON.parse(interaction.output_text!));

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

    return pdfBuffer;
}
