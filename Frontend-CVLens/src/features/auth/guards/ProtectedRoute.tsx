import { Navigate, Outlet } from "react-router";

import ViewLoader from "@/components/shared/ViewLoader";
import { useAuthContext } from "@/providers/auth.provider";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
        return <ViewLoader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
