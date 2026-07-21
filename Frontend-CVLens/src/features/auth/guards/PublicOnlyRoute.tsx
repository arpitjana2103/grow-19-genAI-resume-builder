import { Navigate, Outlet } from "react-router";

import Container from "@/components/layout/Container";
import ViewLoader from "@/components/shared/ViewLoader";
import { useAuthContext } from "@/providers/auth.provider";

export default function PublicOnlyRoute() {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
        return <ViewLoader />;
    }

    if (isAuthenticated) {
        return <Navigate to="/app" replace />;
    }

    return (
        <Container className="pb-20">
            <Outlet />
        </Container>
    );
}
