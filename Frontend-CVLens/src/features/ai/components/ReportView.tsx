import type { UseMutationResult } from "@tanstack/react-query";

import { Button } from "@base-ui/react/button";
import { Delete02Icon, FileDownloadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";

import geminiImg from "@/assets/gemini.png";
import MyButton from "@/components/shared/MyButton";
import ViewLoader from "@/components/shared/ViewLoader";
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
    useDeleteInterviewReportMutation,
    useGenerateResumeMutation,
    useInterviewReportQuery,
} from "../queries/ai.query";
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

export default function ReportView() {
    // cmrrxybmp0000y8o7s0xniofz
    const params = useParams();
    const id = params.reportId;
    const query = useInterviewReportQuery(id!);
    const generateResumeMutation = useGenerateResumeMutation();

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

    const interviewReport = query.data!;

    const goodMatch = interviewReport.matchScore >= 60;

    const handleResumeAction = () => {
        generateResumeMutation.mutate(interviewReport.id);

        if (generateResumeMutation.isPending) {
            return;
        }

        if (generateResumeMutation.data) {
            const a = document.createElement("a");
            a.href = generateResumeMutation.data;
            a.download = `resume_${interviewReport.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            generateResumeMutation.reset();

            return;
        }
    };

    return (
        <div className="mt-6">
            <div className="mb-6 flex items-center justify-center">
                <GenerateResumeBtn
                    generateResumeMutation={generateResumeMutation}
                    handleResumeAction={handleResumeAction}
                />
            </div>

            <h1 className="text-center font-head text-xl sm:text-2xl">
                <span>Interview Report : </span>
                <span className="text-primaryDark">{interviewReport.id.toUpperCase()}</span>
            </h1>
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
                <GeminiLogo />
                <SkillGapTable skillGaps={interviewReport.skillGaps} />

                <div className="mt-10 w-full bg-primary pt-8">
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

                <div className="flex w-full items-center justify-between px-6">
                    <DeleteReport reportId={interviewReport.id} />
                    <GenerateResumeBtn
                        generateResumeMutation={generateResumeMutation}
                        handleResumeAction={handleResumeAction}
                    />
                </div>
            </div>
        </div>
    );
}

function DeleteReport({ reportId }: { reportId: string }) {
    const deleteReportMutation = useDeleteInterviewReportMutation();

    const handleDelete = async function () {
        await deleteReportMutation.mutateAsync(reportId);
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-400 text-white">
                    <HugeiconsIcon icon={Delete02Icon} className="size-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-90 bg-primary/90">
                <DialogHeader>
                    <DialogTitle className="leading-6">
                        Are you sure you want to delete this Interview Report ?{" "}
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter className="mt-4 bg-white/90">
                    <DialogClose render={<MyButton varient="holo" />}>Cancel</DialogClose>
                    <DialogClose
                        render={
                            <MyButton
                                varient="filled"
                                className="border-red-400 bg-red-400 hover:border-red-500 hover:bg-red-500"
                                onClick={handleDelete}
                            />
                        }
                    >
                        Delete
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function GenerateResumeBtn({
    generateResumeMutation,
    handleResumeAction,
}: {
    generateResumeMutation: UseMutationResult<string, Error, string, void>;
    handleResumeAction: () => void;
}) {
    return (
        <Button
            className="flex cursor-pointer items-center justify-center gap-2 self-end rounded-full border-4 border-primary bg-white px-4 py-2 text-lg text-foreground shadow-2xl transition-all hover:translate-y-0.5 hover:bg-white"
            onClick={handleResumeAction}
            disabled={generateResumeMutation.isPending}
        >
            <span className="font-head">
                {generateResumeMutation.isPending && "Generating Resume With"}
                {generateResumeMutation.data && "Resume is Ready to download"}
                {!generateResumeMutation.isPending &&
                    !generateResumeMutation.data &&
                    "Generate an Accurate Resume with"}
                <span
                    className={cn(
                        "pl-1 font-gemini font-medium text-blue-400",
                        generateResumeMutation.data && "hidden",
                    )}
                >
                    {"  "}Gemini
                </span>
            </span>
            <span>
                <HugeiconsIcon
                    icon={FileDownloadIcon}
                    strokeWidth={2}
                    className={cn(
                        "hidden text-primary",
                        generateResumeMutation.data && "inline-block",
                    )}
                />
                <img
                    className={cn(
                        "h-6 w-6",
                        generateResumeMutation.isPending && "animate-spin",
                        generateResumeMutation.data && "hidden",
                    )}
                    src={geminiImg}
                    alt=""
                />
            </span>
        </Button>
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
