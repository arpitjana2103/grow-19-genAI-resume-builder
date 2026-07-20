import { LoginCircle02FreeIcons, LogoutCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useLocation, useNavigate } from "react-router";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { useLogoutMutation } from "@/features/auth/queries/auth.query";
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
    const isAppRoute = pathname === "/app";
    const logoutMutation = useLogoutMutation();

    const handleLogut = async function () {
        await logoutMutation.mutateAsync();
    };

    return (
        <header className={cn("w-screen", className)}>
            <Container>
                <div className="flex items-center justify-between py-4 md:py-4">
                    <div>
                        <Link to={isAuthenticated ? (isAppRoute ? "/" : "/app") : "/"}>
                            <Logo />
                        </Link>
                    </div>

                    <div className="flex gap-2">
                        {!isAuthenticated && isHomeRoute && (
                            <MyButton varient="holo" onClick={() => navigate("/login")}>
                                <span>Login</span>
                                <span>
                                    <HugeiconsIcon
                                        strokeWidth={2.5}
                                        icon={LoginCircle02FreeIcons}
                                        className="text-foreground"
                                    />
                                </span>
                            </MyButton>
                        )}
                        {isAuthenticated && isAppRoute && (
                            <Dialog>
                                <DialogTrigger>
                                    <MyButton varient="holo">
                                        <span>Logout</span>
                                        <span>
                                            <HugeiconsIcon
                                                strokeWidth={2.5}
                                                icon={LogoutCircle02Icon}
                                                className="text-foreground"
                                            />
                                        </span>
                                    </MyButton>
                                </DialogTrigger>
                                <DialogContent className="bg-primary/90">
                                    <DialogHeader>
                                        <DialogTitle>Are you sure you want to logout ?</DialogTitle>
                                    </DialogHeader>
                                    <DialogFooter className="mt-4 bg-white/90">
                                        <DialogClose render={<MyButton varient="holo" />}>
                                            Cancel
                                        </DialogClose>
                                        <DialogClose
                                            render={
                                                <MyButton varient="filled" onClick={handleLogut} />
                                            }
                                        >
                                            Logout
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                        {isHomeRoute && (
                            <MyButton varient="filled" onClick={() => navigate("/app")}>
                                Get Started
                            </MyButton>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}
