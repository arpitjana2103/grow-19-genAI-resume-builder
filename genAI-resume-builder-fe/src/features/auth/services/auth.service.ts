import { create as axiosCreateInstance } from "axios";

import {
    getMeResponseSchema,
    loginResponseSchema,
    logoutResponseSchema,
    registerResponseSchema,
} from "../schemas/auth.schema";

const BASE_URL = `http://localhost:8000`;
const axiosClient = axiosCreateInstance({ baseURL: BASE_URL, withCredentials: true });

export async function getMe() {
    const res = await axiosClient.get("/api/auth/me");

    const data = getMeResponseSchema.parse(res.data);
    return data;
}

export async function register({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}) {
    const res = await axiosClient.post("/api/auth/register", {
        username: username,
        email: email,
        password: password,
    });

    const data = registerResponseSchema.parse(res.data);
    return data;
}

export async function login({ email, password }: { email: string; password: string }) {
    const res = await axiosClient.post("/api/auth/login", {
        email: email,
        password: password,
    });

    const data = loginResponseSchema.parse(res.data);
    return data;
}

export async function logout() {
    const res = await axiosClient.post("/api/auth/logout");
    const data = logoutResponseSchema.parse(res.data);

    return data;
}
