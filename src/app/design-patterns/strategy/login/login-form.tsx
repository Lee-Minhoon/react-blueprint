"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { LoginContext } from "./context-class";
import { EmailLogin, GoogleLogin, KakaoLogin } from "./login-strategy";

enum LoginOptions {
  EMAIL = "Email",
  GOOGLE = "Google",
  KAKAO = "Kakao",
}

const LOGIN_STRATEGIES = {
  [LoginOptions.EMAIL]: new EmailLogin(),
  [LoginOptions.GOOGLE]: new GoogleLogin(),
  [LoginOptions.KAKAO]: new KakaoLogin(),
} as const;

const LOGIN_CONTEXT = new LoginContext(LOGIN_STRATEGIES[LoginOptions.EMAIL]);

const formSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be at most 32 characters."),
});

export default function LoginForm() {
  const [selectedOption, setSelectedOption] = useState<LoginOptions>(
    LoginOptions.EMAIL
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = useCallback<SubmitHandler<z.infer<typeof formSchema>>>(
    (data) => {
      if (data.password !== "password") {
        toast.error("Login failed: Incorrect password.");
        return;
      }
      const loginStrategy = LOGIN_STRATEGIES[selectedOption];
      LOGIN_CONTEXT.setLoginStrategy(loginStrategy);
      toast.success(
        "Login successful : " + LOGIN_CONTEXT.login(data.email, data.password)
      );
    },
    [selectedOption]
  );

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please enter your login details below.
        </CardDescription>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {Object.values(LoginOptions).map((option) => (
            <Button
              key={option}
              variant={selectedOption === option ? "default" : "outline"}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email address"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field className="justify-end" orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
