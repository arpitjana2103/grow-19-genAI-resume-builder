import type { NextFunction, Request, Response } from "express";

import { HTTPSTATUSCODE } from "../configs/http.config.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { handleAsyncError } from "../middlewares/async-error-handler.middleware.js";
import { generateInterviewReport, generateResumePdf } from "../services/ai.service.js";
import {
    createInterViewReportService,
    deleteInterviewReportByIdService,
    getAllInterviewReportsOfAUserService,
    getInterviewReportByIdService,
} from "../services/interview.service.js";
import { parsePDF } from "../services/pdf-parser.service.js";
import { AppError } from "../utils/errors/app-error.util.js";
import { sendResponse } from "../utils/response.util.js";
import {
    GenerateInterviewReportInputSchema,
    InterViewReportByIdResponseSchema,
} from "../validations/interview.validation.js";

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

    const { jobDescription, selfDescription } = GenerateInterviewReportInputSchema.parse(req.body);

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

export const getInterviewReportByIdController = handleAsyncError(async function (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { interviewReportId } = req.params;
    if (!interviewReportId || typeof interviewReportId !== "string") {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.BAD_REQUEST,
            publicMessage: "Expected a valid interview report ID",
            errorCode: ErrorCodeEnum.BAD_REQUEST,
        });
    }

    if (!req.user) {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.UNAUTHORIZED,
            publicMessage: "Uauthorized user can't perform this action",
            errorCode: ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS,
        });
    }

    const interviewReport = await getInterviewReportByIdService(interviewReportId, req.user.id);

    if (!interviewReport) {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.NOT_FOUND,
            publicMessage: "Interview report not found",
            errorCode: ErrorCodeEnum.RESOURCE_NOT_FOUND,
        });
    }

    return sendResponse(res, {
        statusCode: HTTPSTATUSCODE.OK,
        status: "success",
        data: {
            interviewReport: InterViewReportByIdResponseSchema.parse(interviewReport),
        },
    });
});

export const deleteInterviewReportByIdController = handleAsyncError(async function (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { interviewReportId } = req.params;
    if (!interviewReportId || typeof interviewReportId !== "string") {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.BAD_REQUEST,
            publicMessage: "Expected a valid interview report ID",
            errorCode: ErrorCodeEnum.BAD_REQUEST,
        });
    }

    if (!req.user) {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.UNAUTHORIZED,
            publicMessage: "Uauthorized user can't perform this action",
            errorCode: ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS,
        });
    }

    await deleteInterviewReportByIdService(interviewReportId, req.user.id);

    return sendResponse(res, {
        statusCode: HTTPSTATUSCODE.OK,
        status: "success",
    });
});

export const getAllInterviewReportsByUserId = handleAsyncError(async function (
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
    const interviewReports = await getAllInterviewReportsOfAUserService(req.user.id);

    return sendResponse(res, {
        statusCode: HTTPSTATUSCODE.OK,
        status: "success",
        data: {
            interviewReports: interviewReports,
        },
    });
});

export const generateResumePdfController = handleAsyncError(async function (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { interviewReportId } = req.params;
    if (!interviewReportId || typeof interviewReportId !== "string") {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.BAD_REQUEST,
            publicMessage: "Expected a valid interview report ID",
            errorCode: ErrorCodeEnum.BAD_REQUEST,
        });
    }

    if (!req.user) {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.UNAUTHORIZED,
            publicMessage: "Uauthorized user can't perform this action",
            errorCode: ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS,
        });
    }

    const interviewReport = await getInterviewReportByIdService(interviewReportId, req.user.id);

    if (!interviewReport) {
        throw new AppError({
            statusCode: HTTPSTATUSCODE.NOT_FOUND,
            publicMessage: "Interview report not found",
            errorCode: ErrorCodeEnum.RESOURCE_NOT_FOUND,
        });
    }

    const { resumeData, selfDescription, jobDescription } = interviewReport;

    const resumePdfBuffer = await generateResumePdf({
        resume: resumeData,
        selfDescription: selfDescription ?? "use Resume Data as self-description",
        jobDescription: jobDescription,
    });

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    res.send(resumePdfBuffer);
});
