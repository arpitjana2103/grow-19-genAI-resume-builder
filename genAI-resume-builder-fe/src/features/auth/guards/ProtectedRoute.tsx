import { Navigate, Outlet } from "react-router";

import Spinner from "@/components/shared/Spinner";
import { useAuthContext } from "@/providers/auth.provider";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
        return (
            <div className="flex justify-center pt-20">
                <Spinner className="h-20 w-20" strokeWidth={0.7} />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
