import type { NextFunction, Request, Response } from "express";

import { config } from "../configs/app.config.js";
import { HTTPSTATUSCODE } from "../configs/http.config.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { prisma } from "../libs/prisma.js";
import { handleAsyncError } from "../middlewares/async-error-handler.middleware.js";
import { destroySessionAndLogout } from "../services/auth.service.js";
import { createUserService } from "../services/user.service.js";
import { AppError } from "../utils/errors/app-error.util.js";
import { sendResponse } from "../utils/response.util.js";
import { registrationUserSchema } from "../validations/auth.validation.js";

export const handleGoogleAuthSuccess = handleAsyncError(async function (
    req: Request,
    res: Response,
) {
    return res.redirect(`${config.FRONTEND_ORIGIN}`);
});

export const registerUser = handleAsyncError(async function (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { username, email, password } = registrationUserSchema.parse({ ...req.body });
    // 1. check if user already exist
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (existingUser) {
        throw new AppError({
            publicMessage: "User already exist with this email",
            statusCode: HTTPSTATUSCODE.BAD_REQUEST,
            errorCode: ErrorCodeEnum.BAD_REQUEST,
        });
    }

    const newUser = await createUserService({
        username: username,
        email: email,
        password: password,
        provider: "EMAIL",
    });

    sendResponse(res, {
        statusCode: HTTPSTATUSCODE.OK,
        status: "success",
        message: "User registered successfully",
        data: {
            user: {
                name: newUser.username,
                email: newUser.email,
            },
        },
    });
});

export const loginUserSuccess = handleAsyncError(async function (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    sendResponse(res, {
        statusCode: HTTPSTATUSCODE.OK,
        status: "success",
        message: "user logged in",
        data: {
            user: req.user,
        },
    });
});

export const logoutUser = handleAsyncError(async function (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    await destroySessionAndLogout(req, res);

    sendResponse(res, {
        statusCode: HTTPSTATUSCODE.OK,
        status: "success",
        message: "user logged out",
    });
});
