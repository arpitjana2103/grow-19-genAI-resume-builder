import type { Request, Response } from "express";

import { runningOnProduction } from "../configs/app.config.js";

export const destroySessionAndLogout = (req: Request, res: Response): Promise<void> => {
    return new Promise((resolve, reject) => {
        req.logout((err) => {
            // ✅ req.user = undefined
            // ✅ req.session.passport deleted
            if (err) return reject(err);

            req.session.destroy((err) => {
                // ✅ SESSION_ID removed from MemoryStore entirely
                // (not just cleared, fully deleted from server)
                if (err) return reject(err);
                // clearCookie MUST match the exact attributes used when the cookie was set.
                // Without matching sameSite/secure/httpOnly, the browser ignores the clear directive
                // and the old session cookie survives — causing "ghost session" bugs after logout.
                res.clearCookie("g19-session", {
                    httpOnly: true,
                    secure: runningOnProduction(),
                    sameSite: runningOnProduction() ? "none" : "lax",
                    path: "/",
                });
                // ✅ Tells browser to delete the cookie
                // Sets: Set-Cookie: to-session=; Max-Age=0
                resolve();
            });
        });
    });
};
