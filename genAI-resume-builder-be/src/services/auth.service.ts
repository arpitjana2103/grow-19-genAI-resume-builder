import type { Request, Response } from "express";

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
                res.clearCookie("to-session");
                // ✅ Tells browser to delete the cookie
                // Sets: Set-Cookie: to-session=; Max-Age=0
                resolve();
            });
        });
    });
};
