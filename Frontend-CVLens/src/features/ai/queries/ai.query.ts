import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

import { createInterviewReport, getInterviewReportById } from "../services/ai.service";

const TOAST_ID = "create-interview-report";

export function useCreateInterviewReportMutation() {
    // const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: createInterviewReport,
        onMutate: function () {
            toast.loading("Generating interview report...", { id: TOAST_ID, duration: 30 * 1000 });
        },
        onSuccess: async function (data) {
            toast.success("Interview report generated successfully!", {
                id: TOAST_ID,
                duration: 4000,
            });

            const interviewReportId = data.data.interviewReport.id;
            await navigate(`/report/${interviewReportId}`);
        },
        onError: function (error) {
            console.log("Error from : useRegisterMutation");
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                console.log(errorData);
                toast.error(errorData.message, { id: TOAST_ID });
            } else {
                console.log(error);
                toast.error("Failed to create Interview report", { id: TOAST_ID, duration: 4000 });
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
