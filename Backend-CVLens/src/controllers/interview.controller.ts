import type { NextFunction, Request, Response } from "express";

import { HTTPSTATUSCODE } from "../configs/http.config.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { handleAsyncError } from "../middlewares/async-error-handler.middleware.js";
import { generateInterviewReport } from "../services/ai.service.js";
import { createInterViewReportService } from "../services/interview.service.js";
import { parsePDF } from "../services/pdf-parser.service.js";
import { AppError } from "../utils/errors/app-error.util.js";
import { sendResponse } from "../utils/response.util.js";
import { generateInterviewReportInputSchema } from "../validations/interview.validation.js";

/*
req.file
{
  fieldname: 'resume',
  originalname: 'ArpitJana-Resume.pdf',
  encoding: '7bit',
  mimetype: 'application/pdf',
  buffer: <Buffer 25 ... 108527 more bytes>,
  size: 108577
}
*/

export const generateInterviewReportController = handleAsyncError(async function (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (!req.user) {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.UNAUTHORIZED,
            publicMessage: "Uauthorized user can't perform this action",
            errorCode: ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS,
        });
    }
    if (!req.file) {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.BAD_REQUEST,
            publicMessage: "Resume file is required (pdf)",
            errorCode: ErrorCodeEnum.BAD_REQUEST,
        });
    }
    const { jobDescription, selfDescription } = generateInterviewReportInputSchema.parse(req.body);
    const { text: resumeText, pageCount: resumePageCount } = await parsePDF(req.file.buffer);

    if (resumePageCount > 2) {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.BAD_REQUEST,
            publicMessage: "Resume page count must be less than or equal to 2",
            errorCode: ErrorCodeEnum.BAD_REQUEST,
        });
    }

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeText,
        jobDescription: jobDescription,
        selfDescription: selfDescription ?? "consider resume data",
    });

    const interviewReportId = await createInterViewReportService({
        ...interviewReportByAi,
        userId: req.user.id,
        jobDescription: jobDescription,
        selfDescription: selfDescription ?? "consider resume data",
        resumeData: resumeText,
    });

    return sendResponse(res, {
        statusCode: HTTPSTATUSCODE.CREATED,
        status: "success",
        data: {
            interviewReport: {
                id: interviewReportId,
            },
        },
    });
});

const demoInterviewReport = {
    id: "cmrqnth6900001so762kej5aa",
    jobTitle: "MERN Stack Developer",
    jobDescription: "JD - Text",
    matchScore: 85,
    createdAt: "2026-07-18T17:47:40.209Z",
    updatedAt: "2026-07-18T17:47:40.209Z",
    technicalQuestions: [
        {
            question:
                "How do you handle authentication and authorization in a MERN stack application?",
            intention:
                "To test the candidate's understanding of secure session management and API security.",
            answer: "Explain the use of JWT (JSON Web Tokens) or Cookies. Mention storing tokens in HttpOnly cookies to prevent XSS, implementing middleware in Express to protect routes, and hashing passwords with bcrypt.",
        },
        {
            question:
                "Explain your approach to designing a MongoDB schema for a complex application with relational data.",
            intention:
                "To gauge if the candidate understands the difference between SQL and NoSQL and how to handle data modeling effectively.",
            answer: "Discuss the trade-offs between embedding vs. referencing documents. Explain how you prioritize read-heavy versus write-heavy operations when designing the schema.",
        },
        {
            question:
                "How do you ensure frontend performance in a React application that consumes multiple API endpoints?",
            intention:
                "To assess the candidate's ability to optimize UI/UX and manage data fetching efficiently.",
            answer: "Mention techniques like memoization (useMemo, useCallback), code splitting, lazy loading, debouncing API calls, and using caching strategies (e.g., React Query or SWR).",
        },
    ],
    behavioralQuestions: [
        {
            question:
                "Describe a time you had to troubleshoot a difficult bug in a production environment. How did you handle it?",
            intention:
                "To evaluate problem-solving skills under pressure and systematic debugging capability.",
            answer: "Use the STAR method (Situation, Task, Action, Result). Highlight the tools used for logging/debugging and emphasize how you ensured the fix didn't break other features.",
        },
        {
            question:
                "How do you handle disagreements with team members regarding architectural decisions or code implementation?",
            intention: "To assess collaboration, communication, and professional maturity.",
            answer: "Focus on data-driven decision-making. Explain that you prioritize the project's long-term maintainability over personal preference and are open to peer reviews and constructive feedback.",
        },
    ],
    skillGaps: [
        {
            skill: "Cloud Deployment (AWS/Vercel/Docker)",
            severity: "MEDIUM",
        },
        {
            skill: "Automated Testing Frameworks (Jest/Cypress)",
            severity: "MEDIUM",
        },
        {
            skill: "Production-level MongoDB Schema Design",
            severity: "LOW",
        },
    ],
    preparationPlan: [
        {
            day: 1,
            focus: "MERN Stack Deep Dive",
            tasks: [
                "Review MongoDB aggregation pipelines.",
                "Practice building a secure Express middleware suite (auth/validation).",
                "Refactor a past project to include error handling for API failures.",
            ],
        },
        {
            day: 2,
            focus: "Testing & Cloud Basics",
            tasks: [
                "Learn basic Jest syntax for testing React components.",
                "Create a simple Dockerfile for a Node.js Express application.",
                "Deploy a small application to Render or Vercel.",
            ],
        },
        {
            day: 3,
            focus: "System Design & Mock Interview",
            tasks: [
                "Study schema modeling patterns for NoSQL databases.",
                "Review core JavaScript concepts (Closures, Event Loop, Promises).",
                "Perform a mock behavioral interview focused on the STAR method.",
            ],
        },
    ],
};
