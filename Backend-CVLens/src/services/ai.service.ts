import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

import { HTTPSTATUSCODE } from "../configs/http.config.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { AppError } from "../utils/errors/app-error.util.js";
import { InterViewReportAIResponseSchema } from "../validations/ai.validation.js";

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
    const prompt = `
        Generate an interview report for a candidate with the following details [Resume, Self-Description, Job-Description]:
            [Resume] : --------------------------------------
            [[${resume}]]
            [Self-Description] : ----------------------------
            [[${selfDescription}]]
            [Job-Description] : -----------------------------
            [[${jobDescription}]]
    `;

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
