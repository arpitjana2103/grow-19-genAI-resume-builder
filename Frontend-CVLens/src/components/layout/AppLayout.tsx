import { Outlet, ScrollRestoration } from "react-router";

import NavBar from "./NavBar";

export default function AppLayout() {
    return (
        <div className="flex h-dvh flex-col">
            <NavBar className="shrink-0 grow-0 basis-auto" />
            <main className="shrink grow basis-auto">
                <Outlet />
            </main>
            <ScrollRestoration />
        </div>
    );
}
