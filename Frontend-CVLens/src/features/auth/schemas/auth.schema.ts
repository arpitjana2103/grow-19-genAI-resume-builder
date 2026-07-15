import { z } from "zod";

// ---------------------------------------------------------
// 1. Define base User and Response Schemas
// ---------------------------------------------------------

const userSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.email(),
    provider: z.string(),
    profilePic: z.string().nullable(),
});

export type TUser = z.infer<typeof userSchema>;

const baseResponseSchema = z.object({
    success: z.boolean(),
    status: z.enum(["success", "fail", "error"]),
    message: z.string().optional(),
    errorCode: z.string().optional(),
});

// ---------------------------------------------------------
// 2. Route-Specific Schemas
// ---------------------------------------------------------

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

export const loginResponseSchema = baseResponseSchema.extend({
    data: z
        .object({
            user: userSchema,
        })
        .optional(),
});

export const logoutResponseSchema = baseResponseSchema;

export const getMeResponseSchema = baseResponseSchema.extend({
    data: z
        .object({
            user: userSchema,
        })
        .optional(),
});

// ---------------------------------------------------------
// 2. Form Validation Schemas
// ---------------------------------------------------------
export const LoginFormSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});
export type TLoginFormData = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z
    .object({
        username: z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username must be at most 30 characters"),

        email: z.email("Please enter a valid email address"),

        password: z.string().min(8, "Password must be at least 8 characters"),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export type TRegisterFormData = z.infer<typeof RegisterFormSchema>;
