"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Logging in...");

            try {
                const payload = {
                    ...value,
                    email: value.email.trim().toLowerCase(),
                };

                const { data, error } = await authClient.signIn.email(payload);

                if (error) {
                    toast.error(error.message || "Invalid credentials.", {
                        id: toastId,
                    });
                    return;
                }

                toast.success("Welcome back!", { id: toastId });
                form.reset();
                router.push("/");
            } catch (err) {
                toast.error("Something went wrong. Please try again later.", {
                    id: toastId,
                });
                console.log(err);
            }
        },
    });

    return (
        <Card
            className={cn(
                "w-full bg-card/70 backdrop-blur-md max-w-md mx-auto shadow-sm border-none lg:border lg:shadow-sm",
                className,
            )}
            {...props}
        >
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl mt-2 font-bold tracking-tight">
                    Login
                </CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="loginForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <FieldGroup className="space-y-4">
                        {/* email */}
                        <form.Field
                            name="email"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <div className="space-y-2">
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="text-sm font-medium"
                                        >
                                            Email
                                        </FieldLabel>
                                        <Input
                                            type="email"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="m@example.com"
                                            className={cn(
                                                "py-5",
                                                isInvalid &&
                                                    "border-destructive focus-visible:ring-destructive",
                                            )}
                                        />
                                        {isInvalid && (
                                            <FieldError
                                                className="text-xs text-destructive font-medium"
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </div>
                                );
                            }}
                        />

                        {/* password */}
                        <form.Field
                            name="password"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <FieldLabel
                                                htmlFor={field.name}
                                                className="text-sm font-medium"
                                            >
                                                Password
                                            </FieldLabel>
                                            <a
                                                href="#"
                                                className="text-xs text-primary hover:underline font-medium"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                        <Input
                                            type="password"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="••••••••"
                                            className={cn(
                                                "py-5",
                                                isInvalid &&
                                                    "border-destructive focus-visible:ring-destructive",
                                            )}
                                        />
                                        {isInvalid && (
                                            <FieldError
                                                className="text-xs text-destructive font-medium"
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </div>
                                );
                            }}
                        />
                    </FieldGroup>

                    <form.Subscribe
                        selector={(state) => [
                            state.canSubmit,
                            state.isSubmitting,
                        ]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                form="loginForm"
                                className="w-full mt-2 py-5"
                                disabled={!canSubmit || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        )}
                    />
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
                <div className="text-sm text-muted-foreground w-full">
                    Don&apos;t have an account?{" "}
                    <a
                        href="/register"
                        className="text-primary hover:underline font-medium"
                    >
                        Sign up
                    </a>
                </div>
            </CardFooter>
        </Card>
    );
}
