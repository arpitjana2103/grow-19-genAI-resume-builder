import type { TUser } from "@/features/auth/schemas/auth.schema";

import { createContext, useContext, useMemo } from "react";

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

    const value = useMemo(
        () => ({
            user: query.data ?? null,
            isAuthenticated: !!query.data,
            isLoading: query.isLoading,
        }),
        [query.data, query.isLoading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = function () {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
    return context;
};
