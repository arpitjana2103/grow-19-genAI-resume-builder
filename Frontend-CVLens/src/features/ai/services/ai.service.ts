import { create as axiosCreateInstance } from "axios";

import {
    InterViewReportResponseSchema,
    InterviewReportsOfAUserSchema,
} from "../schemas/report.schema";

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
    console.log(jobDescription.length, selfDescription.length);
    const formData = new FormData();
    formData.append("jobDescription", jobDescription.replace(/\r?\n/g, " "));
    formData.append("selfDescription", selfDescription.replace(/\r?\n/g, " "));
    formData.append("resume", resume);

    const response = await axiosClient.post("/interview", formData);
    const data = response.data;
    return data;
}

export async function getInterviewReportById(id: string) {
    const response = await axiosClient.get(`/interview/${id}`);
    const data = response.data;
    return InterViewReportResponseSchema.parse(data.data.interviewReport);
}

export async function getInterviewReportsOfUser() {
    const response = await axiosClient.get("/interview");
    const data = response.data;
    return InterviewReportsOfAUserSchema.parse(data.data.interviewReports);
}
