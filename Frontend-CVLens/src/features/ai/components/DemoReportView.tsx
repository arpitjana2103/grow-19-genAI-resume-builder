import { useNavigate } from "react-router";

import geminiImg from "@/assets/gemini.png";
import MyButton from "@/components/shared/MyButton";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatDate } from "@/lib/utils";

import {
    type TPreparationPlan,
    type TQuestion,
    type TSkillGap,
} from "../validations/report.validation";

type SkillGapTableProps = {
    skillGaps: TSkillGap[];
};

const severityClasses: Record<TSkillGap["severity"], string> = {
    LOW: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    HIGH: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const demoData = {
    id: "cmru359h000006wo7lr0zkluz",
    jobTitle: "React Frontend Engineer",
    matchScore: 88,
    technicalQuestions: [
        {
            question:
                "How do you optimize a React application that is experiencing significant re-renders?",
            intention:
                "Test the candidate's understanding of performance tuning and React internals.",
            answer: "Explain the use of React.memo, useMemo, and useCallback. Discuss avoiding unnecessary state hoisting, code splitting with React.lazy, and analyzing performance via React DevTools.",
        },
        {
            question:
                "Can you explain the event loop in JavaScript and how it affects async operations in React?",
            intention:
                "Evaluate depth of core JS knowledge required for handling complex data flows.",
            answer: "Describe the call stack, task queue, and microtask queue. Explain how promises and async/await interact with these queues to ensure non-blocking UI.",
        },
        {
            question:
                "Explain the strategy you would use to manage state in a large-scale enterprise application.",
            intention: "Check architecture skills beyond basic props/state.",
            answer: "Discuss context API for global low-frequency updates, Redux or Zustand for complex state, and query caching libraries like TanStack Query (React Query) for server state.",
        },
        {
            question:
                "How do you handle error boundaries and graceful degradation in a production React app?",
            intention: "Assess the ability to build resilient, user-friendly interfaces.",
            answer: "Detail the implementation of `componentDidCatch` and `getDerivedStateFromError`. Explain providing fallbacks that allow users to recover or report issues.",
        },
        {
            question:
                "Compare custom hooks vs. higher-order components. When would you prefer one over the other?",
            intention: "Verify understanding of advanced React composition patterns.",
            answer: "State that custom hooks are preferred for logic reuse without creating DOM bloat, while HOCs are useful for cross-cutting concerns like logging or conditional rendering.",
        },
        {
            question: "How do you ensure accessibility (A11y) in custom UI components?",
            intention: "Determine if the candidate cares about inclusive design.",
            answer: "Mention semantic HTML, keyboard navigation, proper ARIA attributes, and testing tools like Lighthouse or screen readers.",
        },
        {
            question: "Describe your process for debugging a memory leak in a React component.",
            intention: "Test practical troubleshooting and production-level maintenance skills.",
            answer: "Discuss clearing intervals/timers in useEffect cleanup functions and identifying unmounted state updates.",
        },
        {
            question: "How do you handle API security, such as token management and authorization?",
            intention: "Check knowledge of authentication workflows.",
            answer: "Explain storing tokens in secure cookies or memory, using Axios interceptors for adding auth headers, and handling 401/403 responses.",
        },
        {
            question:
                "What is the benefit of TypeScript in a large React project, and how do you handle 'any' types?",
            intention: "Validate the candidate's experience with TS migrations and type safety.",
            answer: "Focus on developer experience, refactoring safety, and self-documenting code. Explain using interfaces/types to strictly define data shapes.",
        },
        {
            question: "Explain how you would architect a complex, reusable component library.",
            intention: "Check for scalable coding habits.",
            answer: "Discuss atomic design, modular file structures, documentation via Storybook, and maintaining a consistent design system.",
        },
    ],
    behavioralQuestions: [
        {
            question:
                "Tell me about a time you had to deliver a feature under a tight deadline. How did you maintain quality?",
            intention: "Assess ability to balance speed with technical debt.",
            answer: "Use the STAR method. Focus on prioritization, communicating trade-offs to stakeholders, and writing tests to ensure no regressions.",
        },
        {
            question:
                "Describe a conflict you had with a designer or product manager regarding a feature requirement.",
            intention: "Evaluate collaboration and communication skills.",
            answer: "Show empathy for their perspective while explaining technical constraints. Focus on finding a compromise that delivers value.",
        },
        {
            question:
                "Give an example of a time you took ownership of a project from start to finish.",
            intention: "Evaluate the candidate's sense of accountability.",
            answer: "Highlight a project like 'MistCast', describing the planning, architecture, execution, and deployment phases.",
        },
        {
            question:
                "How do you keep your technical skills updated in such a fast-moving ecosystem?",
            intention: "Assess passion and continuous learning habits.",
            answer: "Mention reading RFCs, tech blogs, personal side projects, and experimenting with new libraries.",
        },
        {
            question: "Tell me about a mistake you made in production. How did you handle it?",
            intention: "Check for ownership and post-mortem analysis capability.",
            answer: "Focus on the fix, the root cause analysis, and how you implemented a process to prevent it from happening again.",
        },
        {
            question: "How do you mentor junior developers or team members?",
            intention: "Verify soft skills and experience in leadership/teaching.",
            answer: "Discuss the value of code reviews, documentation, and helping others learn through explanation rather than just doing it for them.",
        },
        {
            question:
                "Why do you want to work for a lean, fast-paced startup compared to a large corporation?",
            intention: "Assess cultural fit for the 35-person team environment.",
            answer: "Focus on wanting direct impact, faster feedback loops, and taking ownership of the full product lifecycle.",
        },
        {
            question: "Describe a time you proposed a new technology or tool to your team.",
            intention: "Assess influence and ability to justify change.",
            answer: "Focus on the problem solved, the proof-of-concept phase, and the measurable benefits (e.g., performance, developer velocity).",
        },
        {
            question:
                "How do you prioritize your tasks when multiple high-priority features are requested simultaneously?",
            intention: "Evaluate time management.",
            answer: "Discuss aligning with product priorities, understanding user impact, and transparent communication.",
        },
        {
            question: "What is the most challenging feature you have ever built?",
            intention: "Assess depth of technical ability and problem-solving.",
            answer: "Provide a detailed technical narrative of a complex feature, emphasizing the constraints and how you overcame them.",
        },
    ],
    skillGaps: [
        { skill: "Unit/Integration Testing (Jest/Cypress/Playwright)", severity: "HIGH" },
        { skill: "Advanced State Management (Redux/Zustand)", severity: "MEDIUM" },
        { skill: "CI/CD Pipeline integration", severity: "MEDIUM" },
    ],
    preparationPlan: [
        {
            day: 1,
            focus: "Advanced React Patterns",
            tasks: [
                "Study Higher-Order Components",
                "Practice Custom Hooks for data fetching",
                "Learn React.memo and useMemo optimizations",
            ],
        },
        {
            day: 2,
            focus: "Testing Fundamentals",
            tasks: [
                "Read documentation for Jest and React Testing Library",
                "Write 5 tests for your MistCast project components",
            ],
        },
        {
            day: 3,
            focus: "State Management & API Data",
            tasks: [
                "Deep dive into TanStack Query documentation",
                "Understand when to use Context vs State Management libs",
            ],
        },
        {
            day: 4,
            focus: "System Design & Architecture",
            tasks: [
                "Read articles on scaling React applications",
                "Review folder architecture patterns for enterprise apps",
            ],
        },
        {
            day: 5,
            focus: "JavaScript Deep Dive",
            tasks: [
                "Revisit Event Loop, Closures, and Prototypal Inheritance",
                "Practice coding challenges on advanced array methods",
            ],
        },
        {
            day: 6,
            focus: "Mock Interviews",
            tasks: [
                "Review Behavioral responses using STAR method",
                "Conduct a mock interview on platforms like Pramp",
            ],
        },
    ],
    createdAt: "2026-07-21T03:20:02.868Z",
};

export default function DemoReportView() {
    const interviewReport = demoData;

    const goodMatch = interviewReport.matchScore >= 60;

    return (
        <div className="mt-6">
            <div className="mb-6 flex items-center justify-center">
                <GenerateResumeBtn />
            </div>

            {/*<h1 className="text-center font-head text-xl sm:text-2xl">
                <span>Interview Report : </span>
                <span className="text-primaryDark">{interviewReport.id.toUpperCase()}</span>
            </h1>*/}
            <div className="relative mt-6 flex flex-col items-center justify-center border-4 border-primary bg-foreground pt-16 pb-6 text-background">
                <div
                    className={cn(
                        "text-foreground ring-6  flex h-30 w-30 flex-col items-center justify-center rounded-full",
                        goodMatch && "bg-primary ring-primary/60",
                        !goodMatch && "bg-red-300 ring-red-300/60",
                    )}
                >
                    <span className="font-head text-4xl">{interviewReport.matchScore}%</span>
                    <span>Match</span>
                </div>
                <h1 className="mt-4 text-center font-head text-xl sm:text-2xl">
                    {interviewReport.jobTitle}
                </h1>
                <CreatedAt createdAt={interviewReport.createdAt} />
                {/*<GeminiLogo />*/}
                <SkillGapTable skillGaps={interviewReport.skillGaps as unknown as TSkillGap[]} />

                <div className="mt-0 w-full bg-primary pt-8 sm:mt-10">
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="mx-auto bg-transparent">
                            <MyTabTrigger text="Behavioral Questions" />
                            <MyTabTrigger text="Technical Questions" />
                        </TabsList>
                        <MyTabContent text="Behavioral Questions">
                            <MyAccordion questions={interviewReport.behavioralQuestions} />
                        </MyTabContent>
                        <MyTabContent text="Technical Questions">
                            <MyAccordion questions={interviewReport.technicalQuestions} />
                        </MyTabContent>
                    </Tabs>
                </div>

                <PreparationPlan plan={interviewReport.preparationPlan} />

                <div className="flex w-full items-center justify-center">
                    {/*<DeleteReportBtn />*/}
                    <GenerateResumeBtn />
                </div>
            </div>
        </div>
    );
}

// function DeleteReportBtn() {
//     return (
//         <Dialog>
//             <DialogTrigger>
//                 <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-400 text-white">
//                     <HugeiconsIcon icon={Delete02Icon} className="size-6" />
//                 </span>
//             </DialogTrigger>
//             <DialogContent className="w-90 bg-primary/90">
//                 <DialogHeader>
//                     <DialogTitle className="leading-6">
//                         Only Logged in Users can perform this Action !
//                     </DialogTitle>
//                 </DialogHeader>
//                 <DialogFooter className="mt-4 bg-white/90">
//                     <DialogClose render={<MyButton varient="holo" />}>Cancel</DialogClose>
//                     <DialogClose
//                         render={
//                             <MyButton
//                                 varient="filled"
//                                 className="border-red-400 bg-red-400 hover:border-red-500 hover:bg-red-500"
//                             />
//                         }
//                     >
//                         Close
//                     </DialogClose>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }

function GenerateResumeBtn() {
    const navigate = useNavigate();
    return (
        <Dialog>
            <DialogTrigger>
                <span className="flex cursor-pointer items-center justify-center gap-2 self-end rounded-full border-4 border-primary bg-white px-4 py-2 text-lg text-foreground shadow-2xl transition-all hover:translate-y-0.5 hover:bg-white">
                    <span className="font-head">
                        Generate Resume with
                        <span className={cn("pl-1 font-gemini font-medium text-blue-400")}>
                            {"  "}Gemini
                        </span>
                    </span>
                    <span>
                        <img className={cn("h-6 w-6")} src={geminiImg} alt="" />
                    </span>
                </span>
            </DialogTrigger>
            <DialogContent className="w-90 bg-primary/90">
                <DialogHeader>
                    <DialogTitle className="leading-6">
                        Only Logged in Users can perform this Action !
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter className="mt-4 bg-white/90">
                    <DialogClose render={<MyButton varient="holo" />}>Cancel</DialogClose>
                    <DialogClose
                        render={
                            <MyButton
                                varient="filled"
                                className="border-2 border-primary bg-primary text-foreground hover:text-background"
                                onClick={() => navigate("/app")}
                            />
                        }
                    >
                        Login
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function PreparationPlan({ plan }: { plan: TPreparationPlan[] }) {
    return (
        <div className="w-full pt-8 pb-6">
            <h1 className="pb-6 text-center text-xl font-semibold">Preparation Plan</h1>
            <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2">
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
                    className="border-b px-0 text-base last:border-b-0 sm:px-4"
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

// function GeminiLogo() {
//     return (
//         <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-[0.3rem] bg-white p-1 px-1.5 pr-2 text-lg shadow-md sm:text-xl">
//             <span>
//                 <img className="h-5 w-5 sm:h-6 sm:w-6" src={geminiImg} alt="" />
//             </span>
//             <span className="font-gemini font-medium text-[#3186ff]">Gemini</span>
//         </span>
//     );
// }

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
