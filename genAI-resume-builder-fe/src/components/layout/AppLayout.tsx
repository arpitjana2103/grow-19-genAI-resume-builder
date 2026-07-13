import { Outlet } from "react-router";

import Container from "./Container";
import NavBar from "./NavBar";

export default function AppLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <NavBar />
            <main className="flex grow flex-col">
                <Container className="flex grow flex-col">
                    <Outlet />
                </Container>
            </main>
        </div>
    );
}
