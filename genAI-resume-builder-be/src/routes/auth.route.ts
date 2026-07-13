import { Router } from "express";
import passport from "passport";

import { config } from "../configs/app.config.js";
import {
    handleGoogleAuthSuccess,
    loginUserSuccess,
    logoutUser,
    registerUser,
} from "../controllers/auth.controller.js";
import { getMe } from "../controllers/user.controller.js";
import { authProtect, NoAuth } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.route("/google").get(
    NoAuth,
    passport.authenticate("google", {
        scope: ["profile", "email"],
    }),
);

authRoutes.route("/google/callback").get(
    NoAuth,
    (req, res, next) => {
        passport.authenticate("google", { session: true }, (err: any, user: any, info: any) => {
            if (err) {
                const message = err.publicMessage || err.message || "Authentication failed";
                return res.redirect(`${config.FRONTEND_ORIGIN}/login?error=${encodeURIComponent(message)}`);
            }

            if (!user) {
                const message = info?.message || "Authentication failed";
                return res.redirect(`${config.FRONTEND_ORIGIN}/login?error=${encodeURIComponent(message)}`);
            }

            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    return res.redirect(`${config.FRONTEND_ORIGIN}/login?error=session_creation_failed`);
                }
                return next();
            });
        })(req, res, next);
    },
    handleGoogleAuthSuccess,
);

authRoutes.route("/register").post(NoAuth, registerUser);

authRoutes.route("/login").post(
    NoAuth,
    passport.authenticate("local", {
        session: true,
        failWithError: true,
    }),
    loginUserSuccess,
);

authRoutes.route("/logout").post(logoutUser);

authRoutes.route("/me").get(authProtect, getMe);

export default authRoutes;
