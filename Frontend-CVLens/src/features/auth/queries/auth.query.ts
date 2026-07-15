import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { getUser, login, logout, register } from "../services/auth.service";

const TOAST_ID = "auth-toast-query";

export function useUserQuery() {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
    });
}

export function useRegisterMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: register,
        onMutate: function () {
            toast.loading("Registering user ...", { id: TOAST_ID });
        },
        onSuccess: async function () {
            await queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toast.success("Registration successful", { id: TOAST_ID });
        },
        onError: function (error) {
            console.log("Error from : useRegisterMutation");
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                console.log(errorData);
                toast.error(errorData.message, { id: TOAST_ID });
            } else {
                console.log(error);
                toast.error("Registration failed", { id: TOAST_ID });
            }
        },
    });
}

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        onMutate: function () {
            toast.loading("Logging in ...", { id: TOAST_ID });
        },
        onSuccess: async function () {
            await queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toast.success("Login successful", { id: TOAST_ID });
        },

        onError: function (error) {
            console.log("Error from : useLoginMutation");
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                console.log(errorData);
                toast.error(errorData.message, { id: TOAST_ID });
            } else {
                console.log(error);
                toast.error("Login failed", { id: TOAST_ID });
            }
        },
    });
}

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onMutate: function () {
            toast.loading("Logging out ...", { id: TOAST_ID });
        },
        onSuccess: async function () {
            await queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toast.success("Logout successful", { id: TOAST_ID });
        },
        onError: function (error) {
            console.log("Error from : useLogoutMutation");
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                console.log(errorData);
                toast.error(errorData.message, { id: TOAST_ID });
            } else {
                console.log(error);
                toast.error("Logout failed", { id: TOAST_ID });
            }
        },
    });
}
