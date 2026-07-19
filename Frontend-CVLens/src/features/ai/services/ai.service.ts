import { create as axiosCreateInstance } from "axios";

import { InterViewReportResponseSchema } from "../schemas/report.schema";

const BE_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN;

const axiosClient = axiosCreateInstance({ baseURL: `${BE_ORIGIN}/api`, withCredentials: true });

export async function createInterviewReport({
    jobDescription,
    selfDescription,
    resume,
}: {
    jobDescription: string;
    selfDescription: string;
    resume: File;
}) {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    const response = await axiosClient.post("/interview", formData);
    const data = response.data;
    return data;
}

export async function getInterviewReportById(id: string) {
    const response = await axiosClient.get(`/interview/${id}`);
    const data = response.data;
    console.log("data", data);
    return InterViewReportResponseSchema.parse(data.data.interviewReport);
}
