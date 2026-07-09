import type { UserCreateInput, UserModel } from "../_generated/prisma/models.js";

import { HTTPSTATUSCODE } from "../configs/http.config.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { prisma } from "../libs/prisma.js";
import { bcryptHash } from "../utils/bcrypt.util.js";
import { AppError } from "../utils/errors/app-error.util.js";
import { getErrorMessage } from "../utils/errors/format-error.util.js";

export const ensureUserService = async function (data: UserCreateInput): Promise<UserModel> {
    try {
        let user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (user && data.provider !== user.provider) {
            throw new AppError({
                publicMessage: `User sign-in/up failed, Try to login with ${user.provider}`,
                statusCode: HTTPSTATUSCODE.BAD_REQUEST,
                errorCode: ErrorCodeEnum.AUTH_NOT_FOUND,
            });
        }
        if (!user) user = await createUserService(data);
        return user;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError({
            publicMessage: "User sign-in/up failed",
            internalMessage: getErrorMessage(error),
            statusCode: HTTPSTATUSCODE.INTERNAL_SERVER_ERROR,
            errorCode: ErrorCodeEnum.INTERNAL_SERVER_ERROR,
        });
    }
};

export const createUserService = async function (data: UserCreateInput): Promise<UserModel> {
    const { provider, password, email, username, profilePic } = data;

    if (provider === "EMAIL" && !password) {
        throw new AppError({
            publicMessage: "Password is required for EMAIL authentication",
            statusCode: HTTPSTATUSCODE.BAD_REQUEST,
            errorCode: ErrorCodeEnum.MISSING_REQUIRED_FIELD,
        });
    }

    const user = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: password ? await bcryptHash(password) : null,
            profilePic: profilePic ?? null,
            provider: provider,
        },
    });

    return user;
};
