import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useSearchParams } from "react-router";

import MyButton from "@/components/shared/MyButton";
import Spinner from "@/components/shared/Spinner";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

import { useLoginMutation } from "../queries/auth.query";
import { LoginFormSchema, type TLoginFormData } from "../schemas/auth.schema";
import GoogleBtn from "./GoogleBtn";

const BE_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN;

export default function LoginView() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLoginFormData>({
        resolver: zodResolver(LoginFormSchema),
    });
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

    const onSubmit = async function (data: TLoginFormData) {
        await loginMutation.mutateAsync({
            email: data.email,
            password: data.password,
        });
    };

    return (
        <div className="mx-auto mt-14 w-full max-w-100 bg-white p-8 ring-6 ring-primary/80">
            <h3 className="mb-8 text-center text-3xl font-semibold">Login</h3>
            <GoogleBtn href={`${BE_ORIGIN}/api/auth/google`} />
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
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
                                autoComplete="current-password"
                                placeholder="YourPassword"
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
                </FieldGroup>
                <MyButton
                    className="mt-4 flex h-10 w-full items-center"
                    varient="filled"
                    type="submit"
                    disabled={loginMutation.isPending}
                >
                    <span>{loginMutation.isPending && <Spinner />}</span>
                    <span>{!loginMutation.isPending ? "Login" : "Logging in ..."}</span>
                </MyButton>
            </form>
            <p className="mt-3 text-center text-sm transition-colors hover:text-foreground/80">
                Don't have an account ?{" "}
                <Link className="font-semibold" to="/register">
                    Sign up
                </Link>
            </p>
        </div>
    );
}

/*
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const months = [
  { label: "MM", value: null },
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
]

const years = [
  { label: "YYYY", value: null },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
]

export function FieldDemo() {
  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Name on Card
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Card Number
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    Month
                  </FieldLabel>
                  <Select items={months}>
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {months.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Year
                  </FieldLabel>
                  <Select items={years}>
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {years.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="checkout-7j9-same-as-shipping-wgm"
                  className="font-normal"
                >
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Comments
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}

*/
