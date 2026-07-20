import type { TInterViewReportAIResponse } from "../validations/ai.validation.js";

import { prisma } from "../libs/prisma.js";

type TInterviewReport = TInterViewReportAIResponse & {
    userId: string;
    jobDescription: string;
    selfDescription: string;
    resumeData: string;
};

export const createInterViewReportService = async function (data: TInterviewReport) {
    return await prisma.$transaction(async function (tx) {
        // 1. Create InterviewReport
        const interviewReport = await tx.interviewReport.create({
            data: {
                jobTitle: data.jobTitle,
                jobDescription: data.jobDescription,
                selfDescription: data.selfDescription,
                resumeData: data.resumeData,
                matchScore: data.matchScore,
                userId: data.userId,
            },
        });

        // 2. Create BehavioralQuestions
        await tx.behavioralQuestion.createMany({
            data: data.behavioralQuestions.map((q) => ({
                ...q,
                interviewReportId: interviewReport.id,
            })),
        });

        // 3. Create TechnicalQuestions
        await tx.technicalQuestion.createMany({
            data: data.technicalQuestions.map((q) => ({
                ...q,
                interviewReportId: interviewReport.id,
            })),
        });

        // 4. Create SkillGaps
        await tx.skillGap.createMany({
            data: data.skillGaps.map((g) => ({
                ...g,
                interviewReportId: interviewReport.id,
            })),
        });

        // 5. Create PreparationPlans
        await tx.preparationPlan.createMany({
            data: data.preparationPlan.map((p) => ({
                ...p,
                interviewReportId: interviewReport.id,
            })),
        });

        return interviewReport.id;
    });
};

export const getInterviewReportByIdService = async function (id: string, userId: string) {
    // 6. Return the complete report
    return await prisma.interviewReport.findUnique({
        where: {
            id: id,
            userId: userId,
        },
        include: {
            technicalQuestions: true,
            behavioralQuestions: true,
            skillGaps: true,
            preparationPlan: true,
        },
    });
};

export const getAllInterviewReportsOfAUserService = async function (userId: string) {
    return await prisma.interviewReport.findMany({
        where: {
            userId: userId,
        },
        select: {
            jobTitle: true,
            createdAt: true,
            id: true,
        },
    });
};
