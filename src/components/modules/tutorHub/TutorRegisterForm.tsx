"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import {
    User,
    Loader2,
    Check,
    Clock,
    ShieldCheck,
    RotateCcw,
    AlertCircle,
    Banknote,
    Briefcase,
    BookMarked,
    Home,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { tutorService } from "@/service/tutor.service";
import { createTutor } from "@/actions/tutor.action";
import { toast } from "sonner";
import Link from "next/link";

interface TutorRegisterFormProps {
    user: { id: string; name: string };
    subjects: { id: string; name: string }[];
}

const formSchema = z.object({
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    hourlyRate: z.number().min(1, "Minimum rate is ৳1"),
    experienceYears: z.number().min(0, "Cannot be negative"),
    subjectIds: z.array(z.string()).min(1, "Select at least one subject"),
});

function FieldError({ errors }: { errors: unknown[] }) {
    if (!errors?.length) return null;
    const msg =
        typeof errors[0] === "string"
            ? errors[0]
            : ((errors[0] as any)?.message ?? "Invalid value");
    return (
        <p className="flex items-center gap-1.5 text-xs text-destructive mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {msg}
        </p>
    );
}

// ── Success screen ────────────────────────────────────────────────────────────
function SuccessScreen({ name }: { name: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-sm text-center space-y-5">
                <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto">
                        <Clock className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center ring-2 ring-background">
                        <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                </div>

                <div className="space-y-1.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Application Received!
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Thanks,{" "}
                        <span className="font-semibold text-foreground">
                            {name}
                        </span>
                        . Your profile is{" "}
                        <span className="text-amber-600 dark:text-amber-400 font-medium">
                            under review
                        </span>
                        .
                    </p>
                </div>

                <div className="flex items-start gap-3 bg-muted/50 rounded-xl p-4 text-left">
                    <ShieldCheck className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        An admin will verify your details to maintain platform
                        quality. You'll be notified by email once approved.
                    </p>
                </div>

                <Button variant="outline" className="w-full gap-2">
                    <Home className="w-3.5 h-3.5" />
                    <Link href={"/"}> Back to home</Link>
                </Button>
            </div>
        </div>
    );
}

// ── Main form ─────────────────────────────────────────────────────────────────
export default function TutorRegisterForm({
    user,
    subjects,
}: TutorRegisterFormProps) {
    const [submitted, setSubmitted] = useState(false);

    const form = useForm({
        defaultValues: {
            bio: "",
            hourlyRate: 0,
            experienceYears: 0,
            subjectIds: [] as string[],
        },
        validators: { onChange: formSchema },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating tutor account...");
            try {
                const res = await createTutor(value);
                if (!res.success) {
                    return toast.error(res.message, {
                        id: toastId,
                    });
                }
                if (res.success) {
                    toast.success("Tutor Request Successfully Send!", {
                        id: toastId,
                    });
                }
                form.reset();
                setSubmitted(true);
            } catch (err) {
                toast.error("Something went wrong. Please try again later.", {
                    id: toastId,
                });
            }
        },
    });

    if (submitted) return <SuccessScreen name={user.name} />;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-lg shadow-sm">
                {/* ── Header ── */}
                <CardHeader className="pb-0 pt-6 px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold leading-tight">
                                Become a Tutor
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Complete your profile,{" "}
                                <span className="font-medium text-foreground">
                                    {user.name}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 h-px bg-border" />
                </CardHeader>

                <CardContent className="px-6 pt-5 pb-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        {/* BIO */}
                        <form.Field name="bio">
                            {(field) => {
                                const invalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="bio"
                                            className="text-sm font-medium"
                                        >
                                            Bio
                                        </Label>
                                        <Textarea
                                            id="bio"
                                            rows={3}
                                            placeholder="Describe your teaching style and what you specialise in…"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            className={cn(
                                                "resize-none text-sm transition-colors",
                                                invalid &&
                                                    "border-destructive focus-visible:ring-destructive/30",
                                            )}
                                        />
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    </div>
                                );
                            }}
                        </form.Field>

                        {/* RATE + EXPERIENCE */}
                        <div className="grid grid-cols-2 gap-4">
                            <form.Field name="hourlyRate">
                                {(field) => {
                                    const invalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor="hourlyRate"
                                                className="text-sm font-medium"
                                            >
                                                Hourly Rate
                                            </Label>
                                            <div className="relative">
                                                <Banknote className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                                                <Input
                                                    id="hourlyRate"
                                                    type="number"
                                                    min={0}
                                                    placeholder="500"
                                                    value={
                                                        field.state.value || ""
                                                    }
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) =>
                                                        field.handleChange(
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                    className={cn(
                                                        "pl-8 text-sm",
                                                        invalid &&
                                                            "border-destructive focus-visible:ring-destructive/30",
                                                    )}
                                                />
                                            </div>
                                            <p className="text-[11px] text-muted-foreground">
                                                Amount in ৳ / hour
                                            </p>
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        </div>
                                    );
                                }}
                            </form.Field>

                            <form.Field name="experienceYears">
                                {(field) => {
                                    const invalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor="expYears"
                                                className="text-sm font-medium"
                                            >
                                                Experience
                                            </Label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                                                <Input
                                                    id="expYears"
                                                    type="number"
                                                    min={0}
                                                    placeholder="3"
                                                    value={
                                                        field.state.value || ""
                                                    }
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) =>
                                                        field.handleChange(
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                    className={cn(
                                                        "pl-8 text-sm",
                                                        invalid &&
                                                            "border-destructive focus-visible:ring-destructive/30",
                                                    )}
                                                />
                                            </div>
                                            <p className="text-[11px] text-muted-foreground">
                                                Years of teaching
                                            </p>
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        </div>
                                    );
                                }}
                            </form.Field>
                        </div>

                        {/* SUBJECTS */}
                        <form.Field name="subjectIds">
                            {(field) => {
                                const invalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                const selected = field.state.value;
                                return (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm font-medium flex items-center gap-1.5">
                                                <BookMarked className="w-3.5 h-3.5 text-muted-foreground" />
                                                Subjects You Teach
                                            </Label>
                                            {selected.length > 0 && (
                                                <span className="text-xs text-violet-600 font-medium">
                                                    {selected.length} selected
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {subjects.map((sub) => {
                                                const isSelected =
                                                    selected.includes(sub.id);
                                                return (
                                                    <button
                                                        key={sub.id}
                                                        type="button"
                                                        onClick={() =>
                                                            field.handleChange(
                                                                isSelected
                                                                    ? selected.filter(
                                                                          (
                                                                              id,
                                                                          ) =>
                                                                              id !==
                                                                              sub.id,
                                                                      )
                                                                    : [
                                                                          ...selected,
                                                                          sub.id,
                                                                      ],
                                                            )
                                                        }
                                                        className={cn(
                                                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-150",
                                                            isSelected
                                                                ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                                                                : "bg-background text-muted-foreground border-border hover:border-violet-300 hover:text-foreground",
                                                        )}
                                                    >
                                                        {isSelected && (
                                                            <Check className="w-3 h-3 shrink-0" />
                                                        )}
                                                        {sub.name}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {invalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </div>
                                );
                            }}
                        </form.Field>

                        {/* SUBMIT */}
                        <div className="pt-1">
                            <form.Subscribe
                                selector={(s) =>
                                    [s.canSubmit, s.isSubmitting] as const
                                }
                            >
                                {([canSubmit, isSubmitting]) => (
                                    <Button
                                        type="submit"
                                        disabled={!canSubmit || isSubmitting}
                                        className="w-full h-10 bg-violet-600 hover:bg-violet-700 text-white font-medium gap-2 transition-all"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Submitting…
                                            </>
                                        ) : (
                                            "Complete Registration"
                                        )}
                                    </Button>
                                )}
                            </form.Subscribe>

                            <p className="text-center text-xs text-muted-foreground mt-3">
                                Your profile will be reviewed before going live.
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
