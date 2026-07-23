import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

import {
    createInterviewReport,
    getInterviewReportById,
    getInterviewReportsOfUser,
    generateResumePdfService,
    deleteInterviewReportById,
} from "../services/ai.service";

export function useCreateInterviewReportMutation() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: createInterviewReport,
        onMutate: function () {
            toast.loading("Generating interview report...", {
                id: "create-report",
                duration: 30 * 60 * 1000,
            });
        },
        onSuccess: async function (data) {
            await queryClient.invalidateQueries({ queryKey: ["interview-reports"] });
            toast.success("Interview report generated successfully!", {
                id: "create-report",
                duration: 4000,
            });

            const interviewReportId = data.data.interviewReport.id;
            await navigate(`/report/${interviewReportId}`);
        },
        onError: function (error) {
            console.log("Error from : useCreateInterviewReportMutation");
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                console.log(errorData);
                toast.error(errorData.message, { id: "create-report" });
            } else {
                console.log(error);
                toast.error("Failed to create Interview report", {
                    id: "create-report",
                    duration: 4000,
                });
            }
        },
    });
}

export function useInterviewReportQuery(id: string) {
    return useQuery({
        queryKey: ["interview-report", id],
        queryFn: () => getInterviewReportById(id),
        retry: false,
    });
}

export function useInterviewReportsOfUserQuery() {
    return useQuery({
        queryKey: ["interview-reports"],
        queryFn: getInterviewReportsOfUser,
        retry: false,
    });
}

export function useGenerateResumeMutation() {
    return useMutation({
        mutationFn: generateResumePdfService,
        onMutate: function () {
            toast.loading("Generating resume...", {
                id: "generate-resume",
                duration: 30 * 60 * 1000,
            });
        },
        onSuccess: function () {
            toast.success("Resume generated successfully!", {
                id: "generate-resume",
                duration: 4000,
            });
        },
        onError: function (error) {
            console.log("Error from : useGenerateResumeMutation");
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                console.log(errorData);
                toast.error(errorData.message, { id: "generate-resume" });
            } else {
                console.log(error);
                toast.error("Failed to Generate Resume", { id: "generate-resume", duration: 4000 });
            }
        },
    });
}

export function useDeleteInterviewReportMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteInterviewReportById,
        onMutate: function () {
            toast.loading("Deleting Interview Report ...", {
                id: "delete-report",
                duration: 30 * 60 * 1000,
            });
        },
        onSuccess: async function () {
            toast.success("Report Deleted Successfully !", {
                id: "delete-report",
                duration: 4000,
            });
            await queryClient.invalidateQueries({ queryKey: ["interview-reports"] });
            await navigate("/app");
        },
        onError: function (error) {
            console.log("Error from : useDeleteInterviewReportMutation");
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                console.log(errorData);
                toast.error(errorData.message, { id: "delete-report" });
            } else {
                console.log(error);
                toast.error("Failed to Delete Report", { id: "delete-report", duration: 4000 });
            }
        },
    });
}
