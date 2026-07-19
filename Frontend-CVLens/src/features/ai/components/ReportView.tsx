import { Divide } from "lucide-react";
import { parse } from "zod/v4/core";

import geminiImg from "@/assets/gemini.png";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatDate } from "@/lib/utils";

import {
    InterViewReportAIResponseSchema,
    type TPreparationPlan,
    type TQuestion,
    type TSkillGap,
} from "../schemas/report.schema";

const demoInterviewReport = InterViewReportAIResponseSchema.parse({
    id: "cmrqnth6900001so762kej5aa",
    jobTitle: "MERN Stack Developer",
    jobDescription: "JD - Text",
    matchScore: 85,
    createdAt: "2026-07-18T17:47:40.209Z",
    updatedAt: "2026-07-18T17:47:40.209Z",
    technicalQuestions: [
        {
            question:
                "How do you handle authentication and authorization in a MERN stack application?",
            intention:
                "To test the candidate's understanding of secure session management and API security.",
            answer: "Explain the use of JWT (JSON Web Tokens) or Cookies. Mention storing tokens in HttpOnly cookies to prevent XSS, implementing middleware in Express to protect routes, and hashing passwords with bcrypt.",
        },
        {
            question:
                "Explain your approach to designing a MongoDB schema for a complex application with relational data.",
            intention:
                "To gauge if the candidate understands the difference between SQL and NoSQL and how to handle data modeling effectively.",
            answer: "Discuss the trade-offs between embedding vs. referencing documents. Explain how you prioritize read-heavy versus write-heavy operations when designing the schema.",
        },
        {
            question:
                "How do you ensure frontend performance in a React application that consumes multiple API endpoints?",
            intention:
                "To assess the candidate's ability to optimize UI/UX and manage data fetching efficiently.",
            answer: "Mention techniques like memoization (useMemo, useCallback), code splitting, lazy loading, debouncing API calls, and using caching strategies (e.g., React Query or SWR).",
        },
    ],
    behavioralQuestions: [
        {
            question:
                "Describe a time you had to troubleshoot a difficult bug in a production environment. How did you handle it?",
            intention:
                "To evaluate problem-solving skills under pressure and systematic debugging capability.",
            answer: "Use the STAR method (Situation, Task, Action, Result). Highlight the tools used for logging/debugging and emphasize how you ensured the fix didn't break other features.",
        },
        {
            question:
                "How do you handle disagreements with team members regarding architectural decisions or code implementation?",
            intention: "To assess collaboration, communication, and professional maturity.",
            answer: "Focus on data-driven decision-making. Explain that you prioritize the project's long-term maintainability over personal preference and are open to peer reviews and constructive feedback.",
        },
    ],
    skillGaps: [
        {
            skill: "Cloud Deployment (AWS/Vercel/Docker)",
            severity: "MEDIUM",
        },
        {
            skill: "Automated Testing Frameworks (Jest/Cypress)",
            severity: "MEDIUM",
        },
        {
            skill: "Production-level MongoDB Schema Design",
            severity: "LOW",
        },
    ],
    preparationPlan: [
        {
            day: 1,
            focus: "MERN Stack Deep Dive",
            tasks: [
                "Review MongoDB aggregation pipelines.",
                "Practice building a secure Express middleware suite (auth/validation).",
                "Refactor a past project to include error handling for API failures.",
            ],
        },
        {
            day: 2,
            focus: "Testing & Cloud Basics",
            tasks: [
                "Learn basic Jest syntax for testing React components.",
                "Create a simple Dockerfile for a Node.js Express application.",
                "Deploy a small application to Render or Vercel.",
            ],
        },
        {
            day: 3,
            focus: "System Design & Mock Interview",
            tasks: [
                "Study schema modeling patterns for NoSQL databases.",
                "Review core JavaScript concepts (Closures, Event Loop, Promises).",
                "Perform a mock behavioral interview focused on the STAR method.",
            ],
        },
    ],
});

type SkillGapTableProps = {
    skillGaps: TSkillGap[];
};

const severityClasses: Record<TSkillGap["severity"], string> = {
    LOW: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    HIGH: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

export default function ReportView() {
    const match60 = demoInterviewReport.matchScore >= 60;
    return (
        <div className="mt-6">
            <h1 className="text-center font-head text-xl sm:text-2xl">
                <span>Interview Report : </span>
                <span className="text-primaryDark">{demoInterviewReport.id.toUpperCase()}</span>
            </h1>
            <div className="relative mt-6 flex flex-col items-center justify-center border-4 border-primary bg-foreground pt-16 text-background">
                <div
                    className={cn(
                        "text-foreground flex h-30 w-30 flex-col items-center justify-center rounded-full",
                        match60 && "bg-primary",
                        !match60 && "bg-red-300",
                    )}
                >
                    <span className="font-head text-4xl">{demoInterviewReport.matchScore}%</span>
                    <span>Match</span>
                </div>
                <h1 className="mt-4 text-center font-head text-xl sm:text-2xl">
                    {demoInterviewReport.jobTitle}
                </h1>
                <CreatedAt createdAt={demoInterviewReport.createdAt} />
                <GeminiLogo />
                <SkillGapTable skillGaps={demoInterviewReport.skillGaps} />

                <div className="mt-10 w-full bg-primary pt-8">
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="mx-auto bg-transparent">
                            <MyTabTrigger text="Behavioral Questions" />
                            <MyTabTrigger text="Technical Questions" />
                        </TabsList>
                        <MyTabContent text="Behavioral Questions">
                            <MyAccordion questions={demoInterviewReport.behavioralQuestions} />
                        </MyTabContent>
                        <MyTabContent text="Technical Questions">
                            <MyAccordion questions={demoInterviewReport.technicalQuestions} />
                        </MyTabContent>
                    </Tabs>
                </div>

                <PreparationPlan plan={demoInterviewReport.preparationPlan} />
            </div>
        </div>
    );
}

function PreparationPlan({ plan }: { plan: TPreparationPlan[] }) {
    return (
        <div className="w-full pt-8 pb-6">
            <h1 className="pb-6 text-center text-xl font-semibold">Preparation Plan</h1>
            <div className="grid grid-cols-2 gap-4 px-6">
                {plan.map(function (item) {
                    return (
                        <div key={item.day} className="bg-background p-4 text-foreground">
                            <span className="mb-3 block w-fit rounded-full bg-primary px-3 py-1 font-semibold">
                                Day {item.day}
                            </span>
                            <p className="mb-2 text-lg font-semibold">{item.focus}</p>
                            <div className="text-foreground/90">
                                {item.tasks.map(function (task, index) {
                                    return (
                                        <p key={task}>
                                            {index + 1}. {task}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function MyTabTrigger({ text }: { text: string }) {
    return (
        <TabsTrigger
            className="cursor-pointer border-t-2 border-r-2 border-b-2 border-l-0 border-foreground p-4 py-5 text-base font-semibold text-foreground first:border-l-2 hover:text-foreground data-active:p-4 data-active:py-5 data-active:hover:text-foreground"
            value={text}
        >
            {text}
        </TabsTrigger>
    );
}

function MyTabContent({ text, children }: { text: string; children: React.ReactNode }) {
    return (
        <TabsContent className="p-6 text-base" value={text}>
            {children}
        </TabsContent>
    );
}

export function MyAccordion({ questions }: { questions: TQuestion[] }) {
    const items = questions.map((q, index) => ({
        value: `question-${index}`,
        trigger: q.question,
        content: {
            intention: q.intention,
            answer: q.answer,
        },
    }));

    return (
        <Accordion className="w-full rounded-lg text-foreground" defaultValue={["billing"]}>
            {items.map((item) => (
                <AccordionItem
                    key={item.value}
                    value={item.value}
                    className="border-b px-4 text-base last:border-b-0"
                >
                    <AccordionTrigger className="cursor-pointer text-base font-semibold hover:no-underline **:data-[slot=accordion-trigger-icon]:text-foreground">
                        {item.trigger}
                    </AccordionTrigger>
                    <AccordionContent className="mb-4 bg-background p-2 text-base text-foreground/90 sm:p-4">
                        <div>
                            <span>Intention : </span>
                            <p>{item.content.intention}</p>
                            <span>Answer : </span>
                            <p>{item.content.answer}</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

function CreatedAt({ createdAt }: { createdAt: string }) {
    return <span className="absolute top-4 left-4">{`Created @ ${formatDate(createdAt)}`}</span>;
}

function GeminiLogo() {
    return (
        <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-[0.3rem] bg-white p-1 px-1.5 pr-2 text-lg shadow-md sm:text-xl">
            <span>
                <img className="h-5 w-5 sm:h-6 sm:w-6" src={geminiImg} alt="" />
            </span>
            <span className="font-gemini font-medium text-[#3186ff]">Gemini</span>
        </span>
    );
}

function SkillGapTable({ skillGaps }: SkillGapTableProps) {
    if (skillGaps.length === 0) {
        return (
            <div className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
                No skill gaps found.
            </div>
        );
    }

    return (
        <div className="mt-6 overflow-hidden rounded-lg border-2 border-primary">
            <table className="w-full border-collapse text-base">
                <thead className="bg-primary">
                    <tr className="border-b border-primary text-foreground">
                        <th className="px-4 py-3 text-left font-semibold">SKILL GAPS</th>
                        <th className="w-36 px-4 py-3 text-left font-semibold">SEVERITY</th>
                    </tr>
                </thead>

                <tbody>
                    {skillGaps.map((gap) => (
                        <tr
                            key={gap.skill}
                            className="border-b border-primary transition-colors last:border-0 hover:bg-primary hover:text-foreground"
                        >
                            <td className="px-4 py-3">{gap.skill}</td>

                            <td className="px-4 py-3">
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${severityClasses[gap.severity]}`}
                                >
                                    {gap.severity}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
