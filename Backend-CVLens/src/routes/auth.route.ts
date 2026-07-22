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
    // NOTE: We intentionally do NOT use NoAuth here.
    // This route is a browser navigation (href), not an Axios API call.
    // NoAuth throws a JSON 400 error that would render as a raw error page in the browser.
    // Instead, we redirect authenticated users to /app gracefully.
    // This also safely handles "ghost session" edge cases where a stale cookie
    // makes the BE think the user is authenticated, but the FE does not.
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect(`${config.FRONTEND_ORIGIN}/app`);
        }
        next();
    },
    passport.authenticate("google", {
        scope: ["profile", "email"],
    }),
);

authRoutes.route("/google/callback").get(
    // NOTE: Same reasoning as /google — this is a browser redirect from Google,
    // not an Axios call. NoAuth would show a raw JSON 400 error page.
    // If the user hits this with a valid session (edge case), redirect to /app.
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect(`${config.FRONTEND_ORIGIN}/app`);
        }
        next();
    },
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
