import { AuthProvider } from "./auth.provider";
import { QueryProvider } from "./query.provider";

type AppProvidersProps = {
    children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
    );
}
