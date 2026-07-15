import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./auth.provider";
import { QueryProvider } from "./query.provider";

type AppProvidersProps = {
    children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <>
            <Toaster
                position="bottom-left"
                toastOptions={{
                    duration: 5000,
                    style: {
                        background: "#324561",
                        color: "#f0fdf4",
                        fontSize: "0.9rem",
                        borderRadius: "0rem",
                        lineHeight: "1.2rem",
                    },
                }}
            />
            <QueryProvider>
                <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
        </>
    );
}
