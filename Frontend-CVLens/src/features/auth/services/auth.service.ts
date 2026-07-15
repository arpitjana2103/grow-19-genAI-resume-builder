import { create as axiosCreateInstance } from "axios";

import {
    getMeResponseSchema,
    loginResponseSchema,
    logoutResponseSchema,
    registerResponseSchema,
} from "../schemas/auth.schema";

const BE_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN;

const axiosClient = axiosCreateInstance({ baseURL: `${BE_ORIGIN}/api`, withCredentials: true });

export async function getUser() {
    try {
        const res = await axiosClient.get("/auth/me");

        const response = getMeResponseSchema.parse(res.data);

        if (response.success && response.data) {
            return response.data.user;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
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
    const res = await axiosClient.post("/auth/register", {
        username: username,
        email: email,
        password: password,
    });

    const data = registerResponseSchema.parse(res.data);
    return data;
}

export async function login({ email, password }: { email: string; password: string }) {
    const res = await axiosClient.post("/auth/login", {
        email: email,
        password: password,
    });

    const data = loginResponseSchema.parse(res.data);
    return data;
}

export async function logout() {
    const res = await axiosClient.post("/auth/logout");
    const data = logoutResponseSchema.parse(res.data);

    return data;
}
