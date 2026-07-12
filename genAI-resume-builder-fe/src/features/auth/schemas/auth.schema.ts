import { z } from "zod";

// ---------------------------------------------------------
// 1. Define base User and Response Schemas
// ---------------------------------------------------------

// You can adjust this based on what req.user actually contains from your Prisma schema
const userSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    provider: z.string(),
    profilePic: z.string().nullable(),
});

export type TUser = z.infer<typeof userSchema>;

// This matches your 'sendResponse' utility and 'global-error-handler'
const baseResponseSchema = z.object({
    success: z.boolean(),
    status: z.enum(["success", "fail", "error"]),
    message: z.string().optional(),
    errorCode: z.string().optional(),
});

// ---------------------------------------------------------
// 2. Route-Specific Schemas
// ---------------------------------------------------------

// POST /register
export const registerResponseSchema = baseResponseSchema.extend({
    data: z
        .object({
            user: z.object({
                name: z.string(),
                email: z.string().email(),
            }),
        })
        .optional(),
});

// POST /login
export const loginResponseSchema = baseResponseSchema.extend({
    data: z
        .object({
            user: userSchema,
        })
        .optional(),
});

// POST /logout
export const logoutResponseSchema = baseResponseSchema;

// GET /me
export const getMeResponseSchema = baseResponseSchema.extend({
    data: z
        .object({
            user: userSchema,
        })
        .optional(),
});
