import { z } from "zod";

export const generateInterviewReportInputSchema = z.object({
    jobDescription: z.string().trim().min(300).max(1000),
    selfDescription: z.string().trim().min(300).max(1000).optional(),
});
