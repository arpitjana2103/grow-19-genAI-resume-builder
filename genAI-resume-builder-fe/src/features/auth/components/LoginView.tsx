import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

import { useLoginMutation } from "../queries/auth.query";

type LoginFormValues = {
    email: string;
    password: string;
};

export default function LoginView() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();
    const loginMutation = useLoginMutation();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const errorMessage = searchParams.get("error");
        if (errorMessage) {
            toast.error(errorMessage);
            searchParams.delete("error");
            setSearchParams(searchParams, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const onSubmit = async function (data: LoginFormValues) {
        await loginMutation.mutateAsync({
            email: data.email,
            password: data.password,
        });
    };

    return (
        <Container>
            <main>
                <a href="http://localhost:8000/api/auth/google">
                    <Button>Login with Google</Button>
                </a>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="border"
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="border"
                            id="password"
                            type="text"
                            autoComplete="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <button type="submit" disabled={loginMutation.isPending}>
                        Login
                    </button>
                </form>
            </main>
        </Container>
    );
}
