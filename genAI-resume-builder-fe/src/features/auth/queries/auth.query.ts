import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getUser, login, logout, register } from "../services/auth.service";

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
        onSuccess: function () {},
        onError: function (error) {
            console.log("Error from : useRegisterMutation");
            console.log(error);
            queryClient.setQueryData(["user"], null);
        },
    });
}

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },

        onError: function (error) {
            console.log("Error from : useLoginMutation");
            console.log(error);
            queryClient.setQueryData(["user"], null);
        },
    });
}

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: function () {
            queryClient.setQueryData(["me"], null);
        },
        onError: function (error) {
            console.log("Error from : useLogoutMutation");
            console.log(error);
        },
    });
}

/*
onError: function (error) {
    if (error instanceof AxiosError) {
        // This is where your backend's JSON payload lives!
        const backendErrorPayload = error.response?.data;

        console.log(backendErrorPayload.message); // "Invalid email or password"
        console.log(backendErrorPayload.errorCode); // "AUTH_NOT_FOUND"

        // Show this message to the user in a Toast notification
    }
}

*/
