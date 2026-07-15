import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import AppLayout from "./components/layout/AppLayout";
import AppView from "./features/ai/components/AppView";
import LoginView from "./features/auth/components/LoginView";
import RegisterView from "./features/auth/components/RegisterView";
import ProtectedRoute from "./features/auth/guards/ProtectedRoute";
import PublicOnlyRoute from "./features/auth/guards/PublicOnlyRoute";
import HomeView from "./features/home/components/HomeView";

export default function App() {
    return (
        <RouterProvider
            router={createBrowserRouter([
                {
                    path: "/",
                    element: <AppLayout />,
                    children: [
                        {
                            index: true,
                            element: <HomeView />,
                        },
                        {
                            element: <PublicOnlyRoute />,
                            children: [
                                {
                                    path: "login",
                                    element: <LoginView />,
                                },
                                {
                                    path: "register",
                                    element: <RegisterView />,
                                },
                            ],
                        },
                        {
                            element: <ProtectedRoute />,
                            children: [
                                {
                                    path: "app",
                                    element: <AppView />,
                                },
                            ],
                        },
                    ],
                },
            ])}
        />
    );
}
