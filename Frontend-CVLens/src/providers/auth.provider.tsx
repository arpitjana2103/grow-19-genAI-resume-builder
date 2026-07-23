import type { TUser } from "@/features/auth/validations/auth.validation";

import { createContext, useContext, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

import { useUserQuery } from "@/features/auth/queries/auth.query";

type TContext = {
    user: TUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

const AuthContext = createContext<TContext | null>(null);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = function ({ children }: AuthProviderProps) {
    const query = useUserQuery();

    useEffect(() => {
        const TOAST_ID = "auth-toast-provider";

        if (query.isLoading || query.isFetching) {
            toast.loading("Authenticating ...", { id: TOAST_ID, duration: 30 * 60 * 1000 });
        } else if (query.isSuccess) {
            if (query.data !== null) {
                const username = query.data?.username;
                toast.success(`Welcome ${username} 💐`, { id: TOAST_ID, duration: 4000 });
            } else {
                toast("User not logged in !", { id: TOAST_ID, icon: "⚠️", duration: 4000 });
            }
        } else if (query.isError) {
            toast.error("Failed to get logged in user.", { id: TOAST_ID });
        }
    }, [
        query.isLoading,
        query.isSuccess,
        query.isError,
        query.isFetching,
        query.data?.username,
        query.data,
    ]);

    const value = useMemo(
        () => ({
            user: query.data ?? null,
            isAuthenticated: !!query.data,
            isLoading: query.isLoading || query.isFetching,
        }),
        [query.data, query.isLoading, query.isFetching],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = function () {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
    return context;
};
