import { z } from "zod";

export const QuestionSchema = z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
});

export const SkillGapSchema = z.object({
    skill: z.string(),
    severity: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export const PreparationPlanSchema = z.object({
    day: z.number(),
    focus: z.string(),
    tasks: z.array(z.string()),
});

export const InterViewReportByIdResponseSchema = z.object({
    id: z.string(),
    jobTitle: z.string(),
    jobDescription: z.string(),
    selfDescription: z.string(),
    resumeData: z.string(),
    matchScore: z.number().min(0).max(100),
    technicalQuestions: z.array(QuestionSchema),
    behavioralQuestions: z.array(QuestionSchema),
    skillGaps: z.array(SkillGapSchema),
    preparationPlan: z.array(PreparationPlanSchema),
    createdAt: z.string(),
});

export const InterviewReportsOfAUserSchema = z.array(
    z.object({
        jobTitle: z.string(),
        createdAt: z.string(),
        id: z.string(),
        matchScore: z.number(),
    }),
);

export type TQuestion = z.infer<typeof QuestionSchema>;
export type TSkillGap = z.infer<typeof SkillGapSchema>;
export type TPreparationPlan = z.infer<typeof PreparationPlanSchema>;
