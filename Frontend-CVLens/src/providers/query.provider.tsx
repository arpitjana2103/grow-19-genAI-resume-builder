import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type TQueryProviderProps = {
    children: React.ReactNode;
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchOnMount: true,
        },
        mutations: {
            retry: false,
        },
    },
});

export const QueryProvider = ({ children }: TQueryProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <>{children}</>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
