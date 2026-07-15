import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import MyButton from "@/components/shared/MyButton";
import Spinner from "@/components/shared/Spinner";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

import { useRegisterMutation } from "../queries/auth.query";
import { RegisterFormSchema, type TRegisterFormData } from "../schemas/auth.schema";
import GoogleBtn from "./GoogleBtn";

const BE_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN;

export default function RegisterView() {
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm<TRegisterFormData>({ resolver: zodResolver(RegisterFormSchema) });

    const registerMutation = useRegisterMutation();
    const onSubmit = async function (data: TRegisterFormData) {
        await registerMutation.mutateAsync({
            username: data.username,
            email: data.email,
            password: data.password,
        });
    };

    return (
        <div className="mx-auto mt-14 w-full max-w-100 bg-white p-8 ring-6 ring-primary/80">
            <h3 className="mb-8 text-center text-3xl font-semibold">Create Account</h3>
            <GoogleBtn href={`${BE_ORIGIN}/api/auth/google`} />
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <InputGroup>
                            <InputGroupInput
                                type="text"
                                autoComplete="username"
                                placeholder="Your Name"
                                {...register("username")}
                            />
                            <InputGroupAddon align="block-start">
                                <InputGroupText className="text-foreground">
                                    Username
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.username && (
                            <FieldDescription className="text-red-400">
                                {errors.username.message}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <InputGroup>
                            <InputGroupInput
                                type="email"
                                autoComplete="email"
                                placeholder="example@gmail.com"
                                {...register("email")}
                            />
                            <InputGroupAddon align="block-start">
                                <InputGroupText className="text-foreground">Email</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.email && (
                            <FieldDescription className="text-red-400">
                                {errors.email.message}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <InputGroup>
                            <InputGroupInput
                                type="password"
                                autoComplete="new-password"
                                placeholder="At least 8 characters"
                                {...register("password")}
                            />
                            <InputGroupAddon align="block-start">
                                <InputGroupText className="text-foreground">
                                    Password
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.password && (
                            <FieldDescription className="text-red-400">
                                {errors.password.message}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <InputGroup>
                            <InputGroupInput
                                type="password"
                                placeholder="Repeat Password"
                                {...register("confirmPassword")}
                            />
                            <InputGroupAddon align="block-start">
                                <InputGroupText className="text-foreground">
                                    Confirm Password
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.confirmPassword && (
                            <FieldDescription className="text-red-400">
                                {errors.confirmPassword.message}
                            </FieldDescription>
                        )}
                    </Field>
                </FieldGroup>
                <MyButton
                    className="mt-4 flex h-10 w-full items-center"
                    varient="filled"
                    type="submit"
                    disabled={registerMutation.isPending}
                >
                    <span>{registerMutation.isPending && <Spinner />}</span>
                    <span>{!registerMutation.isPending ? "Signup" : "Signing up ..."}</span>
                </MyButton>
            </form>
            <p className="mt-3 text-center text-sm transition-colors hover:text-foreground/80">
                Already have an account?{" "}
                <Link className="font-semibold" to="/login">
                    Login
                </Link>
            </p>
        </div>
    );
}
