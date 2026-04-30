"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
    Banknote,
    Briefcase,
    Check,
    GraduationCap,
    Loader2,
    Sparkles,
    Type,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    bio: z.string().min(10).max(225),
    hourlyRate: z.number().min(1),
    experienceYears: z.number().min(0),
    subjectIds: z.array(z.string()).min(1),
});

export function TutorForm({
    subjects,
    defaultValues,
    onSubmit,
    submitText,
}: any) {
    const form = useForm({
        defaultValues,
        validators: { onChange: formSchema },
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="max-w-3xl mx-auto px-4 pb-10"
        >
            <Card className="shadow-md border-muted">
                <CardHeader className="space-y-1 mb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Tutor Profile
                    </CardTitle>
                    <CardDescription>
                        Complete your details to start connecting with students.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* BIO SECTION */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <Type className="h-5 w-5" />
                            </div>
                            <Label className="text-base font-bold">
                                Professional Bio
                            </Label>
                        </div>

                        <form.Field name="bio">
                            {(field) => (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Textarea
                                            id={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            className="min-h-30 resize-none pr-12"
                                            placeholder="Describe your teaching style..."
                                        />
                                        <div className="absolute bottom-2 right-2 text-[10px] font-medium px-2 py-1 rounded border bg-background text-muted-foreground">
                                            {field.state.value.length}/225
                                        </div>
                                    </div>
                                    {field.state.meta.errors && (
                                        <p className="text-xs text-destructive">
                                            {field.state.meta.errors.join(", ")}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form.Field>
                    </div>

                    <Separator className="opacity-50" />

                    {/* LOGISTICS GRID */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <form.Field name="hourlyRate">
                            {(field) => (
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2 font-bold text-emerald-600">
                                        <Banknote className="h-4 w-4" /> Hourly
                                        Rate
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="h-12 text-lg font-semibold pr-12"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                            BDT
                                        </span>
                                    </div>
                                </div>
                            )}
                        </form.Field>

                        <form.Field name="experienceYears">
                            {(field) => (
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2 font-bold text-blue-600">
                                        <Briefcase className="h-4 w-4" />{" "}
                                        Experience
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="h-12 text-lg font-semibold pr-12"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded uppercase">
                                            Years
                                        </span>
                                    </div>
                                </div>
                            )}
                        </form.Field>
                    </div>

                    <Separator className="opacity-50" />

                    {/* SUBJECTS SECTION */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <Label className="text-base font-bold">
                                Expertise Subjects
                            </Label>
                        </div>

                        <form.Field name="subjectIds">
                            {(field) => (
                                <div className="flex flex-wrap gap-2">
                                    {subjects.map((sub: any) => {
                                        const isSelected =
                                            field.state.value.includes(sub.id);
                                        return (
                                            <Button
                                                key={sub.id}
                                                type="button"
                                                variant={
                                                    isSelected
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className={cn(
                                                    "rounded-xl transition-all",
                                                    isSelected &&
                                                        "bg-violet-800 text-white hover:bg-violet-700",
                                                )}
                                                onClick={() => {
                                                    const next = isSelected
                                                        ? field.state.value.filter(
                                                              (id: string) =>
                                                                  id !== sub.id,
                                                          )
                                                        : [
                                                              ...field.state
                                                                  .value,
                                                              sub.id,
                                                          ];
                                                    field.handleChange(next);
                                                }}
                                            >
                                                {isSelected && (
                                                    <Check className="mr-2 h-4 w-4" />
                                                )}
                                                {sub.name}
                                            </Button>
                                        );
                                    })}
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <form.Subscribe
                        selector={(s) => [s.canSubmit, s.isSubmitting] as const}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="h-14 w-full rounded-2xl text-lg font-bold shadow-lg mt-4"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : (
                                    <Sparkles className="mr-2 h-5 w-5" />
                                )}
                                {submitText || "Publish Tutor Profile"}
                            </Button>
                        )}
                    </form.Subscribe>
                </CardContent>
            </Card>
        </form>
    );
}
