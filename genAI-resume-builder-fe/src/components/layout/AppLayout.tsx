import { Outlet } from "react-router";

import Container from "./Container";
import NavBar from "./NavBar";

export default function AppLayout() {
    return (
        <div className="flex h-dvh flex-col">
            <NavBar />
            <main className="flex-1">
                <Container className="pb-20">
                    <Outlet />
                </Container>
            </main>
        </div>
    );
}
