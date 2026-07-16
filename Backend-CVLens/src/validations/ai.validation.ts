import { z } from "zod";

const descriptions = {
    jobTitle: "The title of the job for which the interview report is generated",
    matchScore:
        "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    technicalQuestions: {
        self: "Technical questions that can be asked in the interview along with their intention and how to answer them",
        question: "The technical question can be asked in the interview",
        intention: "The intention of interviewer behind asking this question",
        answer: "How to answer this question, what points to cover, what approach to take etc.",
    },
    behavioralQuestions: {
        self: "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
        question: "The behavioral question can be asked in the interview",
        intention: "The intention of interviewer behind asking this question",
        answer: "How to answer this question, what points to cover, what approach to take etc.",
    },
    skillGaps: {
        self: "List of skill gaps in the candidate's profile along with their severity",
        skill: "The skill which the candidate is lacking",
        severity:
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
    },
    preparationPlan: {
        self: "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
        day: "The day number in the preparation plan, starting from 1",
        focus: "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
        tasks: "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
    },
};

export const interViewReportAIResponseSchema = z.object({
    jobTitle: z.string().describe(descriptions.jobTitle),
    matchScore: z.number().min(0).max(100).describe(descriptions.matchScore),
    technicalQuestions: z
        .array(
            z.object({
                question: z.string().describe(descriptions.technicalQuestions.question),
                intention: z.string().describe(descriptions.technicalQuestions.intention),
                answer: z.string().describe(descriptions.technicalQuestions.answer),
            }),
        )
        .describe(descriptions.technicalQuestions.self),
    behavioralQuestions: z
        .array(
            z.object({
                question: z.string().describe(descriptions.behavioralQuestions.question),
                intention: z.string().describe(descriptions.behavioralQuestions.intention),
                answer: z.string().describe(descriptions.behavioralQuestions.answer),
            }),
        )
        .describe(descriptions.behavioralQuestions.self),
    skillGaps: z
        .array(
            z.object({
                skill: z.string().describe(descriptions.skillGaps.skill),
                severity: z.string().describe(descriptions.skillGaps.severity),
            }),
        )
        .describe(descriptions.skillGaps.self),
    preparationPlan: z
        .array(
            z.object({
                day: z.number().describe(descriptions.preparationPlan.day),
                focus: z.string().describe(descriptions.preparationPlan.focus),
                tasks: z.string().describe(descriptions.preparationPlan.tasks),
            }),
        )
        .describe(descriptions.preparationPlan.self),
});

// export const interViewReportAIResponseJsonSchema = {
//     type: "object",
//     properties: {
//         jobTitle: {
//             type: "string",
//             description: "The title of the job for which the interview report is generated",
//         },
//         matchScore: {
//             type: "number",
//             minimum: 0,
//             maximum: 100,
//             description:
//                 "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
//         },
//         technicalQuestions: {
//             type: "array",
//             description:
//                 "Technical questions that can be asked in the interview along with their intention and how to answer them",
//             items: {
//                 type: "object",
//                 properties: {
//                     question: {
//                         type: "string",
//                         description: "The technical question can be asked in the interview",
//                     },
//                     intention: {
//                         type: "string",
//                         description: "The intention of interviewer behind asking this question",
//                     },
//                     answer: {
//                         type: "string",
//                         description:
//                             "How to answer this question, what points to cover, what approach to take etc.",
//                     },
//                 },
//                 required: ["question", "intention", "answer"],
//             },
//         },
//         behavioralQuestions: {
//             type: "array",
//             description:
//                 "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
//             items: {
//                 type: "object",
//                 properties: {
//                     question: {
//                         type: "string",
//                         description: "The behavioral question can be asked in the interview",
//                     },
//                     intention: {
//                         type: "string",
//                         description: "The intention of interviewer behind asking this question",
//                     },
//                     answer: {
//                         type: "string",
//                         description:
//                             "How to answer this question, what points to cover, what approach to take etc.",
//                     },
//                 },
//                 required: ["question", "intention", "answer"],
//             },
//         },
//         skillGaps: {
//             type: "array",
//             description: "List of skill gaps in the candidate's profile along with their severity",
//             items: {
//                 type: "object",
//                 properties: {
//                     skill: {
//                         type: "string",
//                         description: "The skill which the candidate is lacking",
//                     },
//                     severity: {
//                         type: "string",
//                         description:
//                             "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
//                     },
//                 },
//                 required: ["skill", "severity"],
//             },
//         },
//         preparationPlan: {
//             type: "array",
//             description:
//                 "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
//             items: {
//                 type: "object",
//                 properties: {
//                     day: {
//                         type: "number",
//                         description: "The day number in the preparation plan, starting from 1",
//                     },
//                     focus: {
//                         type: "string",
//                         description:
//                             "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
//                     },
//                     tasks: {
//                         type: "string",
//                         description:
//                             "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
//                     },
//                 },
//                 required: ["day", "focus", "tasks"],
//             },
//         },
//     },
//     required: [
//         "jobTitle",
//         "matchScore",
//         "technicalQuestions",
//         "behavioralQuestions",
//         "skillGaps",
//         "preparationPlan",
//     ],
// } as const;
