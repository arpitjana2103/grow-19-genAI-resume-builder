import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";

import geminiImg from "@/assets/gemini.png";
import ViewLoader from "@/components/shared/ViewLoader";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatDate } from "@/lib/utils";

import { useInterviewReportQuery } from "../queries/ai.query";
import { type TPreparationPlan, type TQuestion, type TSkillGap } from "../schemas/report.schema";

type SkillGapTableProps = {
    skillGaps: TSkillGap[];
};

const severityClasses: Record<TSkillGap["severity"], string> = {
    LOW: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    HIGH: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

export default function ReportView() {
    // cmrrxybmp0000y8o7s0xniofz
    const params = useParams();
    const id = params.reportId;
    const query = useInterviewReportQuery(id!);

    if (query.isLoading) {
        return <ViewLoader />;
    }

    if (query.isError) {
        let errorMessage = query.error.message;
        if (query.error instanceof AxiosError) {
            errorMessage = query.error.response?.data?.message ?? errorMessage;
        }
        toast.error(errorMessage);
        return <ViewLoader />;
    }

    const demoInterviewReport = query.data!;

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
