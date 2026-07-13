import { Link, useLocation, useNavigate } from "react-router";

import { cn } from "@/lib/utils";
import { useAuthContext } from "@/providers/auth.provider";

import Logo from "../shared/Logo";
import MyButton from "../shared/MyButton";
import Container from "./Container";

export default function NavBar({ className }: { className?: string }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isAuthenticated } = useAuthContext();
    const isHomeRoute = pathname === "/";
    return (
        <header className={cn("w-screen", className)}>
            <Container>
                <div className="flex items-center justify-between py-6">
                    <div>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>

                    <div className="flex gap-2">
                        {!isAuthenticated && isHomeRoute && (
                            <MyButton type="holo" onClick={() => navigate("/login")}>
                                Login
                            </MyButton>
                        )}
                        {isHomeRoute && (
                            <MyButton type="filled" onClick={() => navigate("/app")}>
                                Get Started
                            </MyButton>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}
