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
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, "Please enter your name"),
    email: z.email("Please enter a valid email address"),
    image: z.url("Please enter a valid image URL"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            image: "",
            password: "",
        },
        validators: {
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating your account...");

            try {
                const payload = {
                    ...value,
                    email: value.email.trim().toLowerCase(),
                };

                const { data, error } = await authClient.signUp.email(payload);

                if (error) {
                    toast.error(error.message || "Failed to create account.", {
                        id: toastId,
                    });
                    return;
                }

                if (!data?.user) {
                    toast.error("Something went wrong. Please try again.", {
                        id: toastId,
                    });
                    return;
                }

                toast.success("Account created successfully!", {
                    description:
                        "We've sent a verification link to your email. Please verify your account before logging in.",
                    id: toastId,
                });
                form.reset();
                router.push("/login");
            } catch (err) {
                toast.error("Something went wrong. Please try again later.", {
                    id: toastId,
                });
            }
        },
    });

    return (
        <Card
            className={cn(
                "w-full md:max-w-md mx-auto shadow-sm bg-card/70 backdrop-blur-md",
                className,
            )}
            {...props}
        >
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                    Create an account
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Enter your information below to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="registerForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="space-y-6"
                >
                    <FieldGroup className="space-y-4">
                        {/* Name */}
                        <form.Field
                            name="name"
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
                                            Name
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="John Doe"
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

                        {/* Email */}
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

                        {/* Image URL */}
                        <form.Field
                            name="image"
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
                                            Profile Image URL
                                        </FieldLabel>
                                        <Input
                                            type="url"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://example.com/avatar.jpg"
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

                        {/* Password */}
                        <form.Field
                            name="password"
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
                                            Password
                                        </FieldLabel>
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
                                form="registerForm"
                                className="w-full py-5"
                                disabled={!canSubmit || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        )}
                    />
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
                <div className="text-sm text-muted-foreground w-full">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-primary hover:underline font-medium"
                    >
                        Sign in
                    </a>
                </div>
            </CardFooter>
        </Card>
    );
}
