import type { Profile } from "passport";
import type { VerifyCallback } from "passport-google-oauth20";

import { type Request } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";

import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { prisma } from "../libs/prisma.js";
import { ensureUserService } from "../services/user.service.js";
import { bcryptCompare } from "../utils/bcrypt.util.js";
import { AppError } from "../utils/errors/app-error.util.js";
import { config } from "./app.config.js";
import { HTTPSTATUSCODE } from "./http.config.js";
import { logger } from "./logger.config.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.get_BACKEND_GOOGLE_CALLBACK_URL(),
            scope: ["profile", "email"],
            passReqToCallback: true,
        },
        async function (
            req: Request,
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback,
        ) {
            try {
                const email = profile.emails?.[0]?.value;
                const googleId = profile.id;
                const pictureUrl = profile.photos?.[0]?.value;
                const name = profile.displayName;

                if (!email) {
                    throw new AppError({
                        publicMessage: "Authentication failed. Email not available.",
                        statusCode: HTTPSTATUSCODE.UNAUTHORIZED,
                        errorCode: ErrorCodeEnum.AUTH_NOT_FOUND,
                    });
                }

                const user = await ensureUserService({
                    email: email,
                    username: name,
                    password: null,
                    profilePic: pictureUrl ?? null,
                    provider: "GOOGLE",
                });

                user.password = "__REMOVED_FOR_SECURITY__";

                done(null, user);
            } catch (error) {
                done(error, false);
            }
        },
    ),
);

passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password", passReqToCallback: true },
        async function (req: Request, email: string, password: string, done) {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (!user) {
                    throw new AppError({
                        internalMessage: `No user found for email: ${email}`,
                        publicMessage: "Invalid email or password",
                        statusCode: HTTPSTATUSCODE.UNAUTHORIZED,
                        errorCode: ErrorCodeEnum.AUTH_NOT_FOUND,
                    });
                }

                if (user.provider === "GOOGLE") {
                    throw new AppError({
                        internalMessage: "user.provider = GOOGLE, trying to login with EMAIL",
                        publicMessage: "Try Login with GOOGLE",
                        statusCode: HTTPSTATUSCODE.BAD_REQUEST,
                        errorCode: ErrorCodeEnum.AUTH_INVALID_CREDENTIALS,
                    });
                }

                const matchPassword = await bcryptCompare(password, user.password!);

                if (!matchPassword) {
                    throw new AppError({
                        internalMessage: `Incorrect password, for email: ${email}`,
                        publicMessage: "Invalid email or password",
                        statusCode: HTTPSTATUSCODE.UNAUTHORIZED,
                        errorCode: ErrorCodeEnum.AUTH_NOT_FOUND,
                    });
                }

                user.password = "__REMOVED_FOR_SECURITY__";
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        },
    ),
);

passport.serializeUser(function (user, done) {
    const userId = String((user as { id: string }).id);
    done(null, userId);
});

passport.deserializeUser(async function (id: string, done) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return done(null, false);
        }

        user.password = "__REMOVED_FOR_SECURITY__";
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});
