import type { Request, Response, NextFunction } from "express";

import { HTTPSTATUSCODE } from "../configs/http.config.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { handleAsyncError } from "../middlewares/async-error-handler.middleware.js";
import { AppError } from "../utils/errors/app-error.util.js";
import { sendResponse } from "../utils/response.util.js";

export const getMe = handleAsyncError(async function (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (req.isAuthenticated() && req.user) {
        sendResponse(res, {
            statusCode: HTTPSTATUSCODE.OK,
            status: "success",
            data: {
                user: req.user,
            },
        });
    } else {
        throw new AppError({
            publicMessage: "User not authenticated",
            statusCode: HTTPSTATUSCODE.UNAUTHORIZED,
            errorCode: ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS,
        });
    }
});
