"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Plus, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldError } from "@/components/ui/field";
import { createSlot } from "@/actions/slot.action";

const slotSchema = z
    .object({
        dayOfWeek: z.string().min(1, "Day is required"),
        startTime: z.string().min(1, "Start time is required"),
        endTime: z.string().min(1, "End time is required"),
    })
    .refine((data) => data.endTime > data.startTime, {
        message: "End time must be after start time",
        path: ["endTime"],
    });

const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, "0");
        options.push(`${hour}:00:00`);
        options.push(`${hour}:30:00`);
    }
    return options;
};

const timeOptions = generateTimeOptions();
const dayOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const SlotForm = ({ tutorId }: { tutorId: string }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            dayOfWeek: "",
            startTime: "",
            endTime: "",
        },
        validators: {
            onChange: ({ value }) => {
                const result = slotSchema.safeParse(value);
                if (!result.success) {
                    return result.error.flatten().fieldErrors;
                }
                return undefined;
            },
        },
        onSubmit: async ({ value }) => {
            try {
                const payload = {
                    ...value,
                    dayOfWeek: value.dayOfWeek as any,
                };
                const res = await createSlot(payload);
                if (!res.success) {
                    return toast.error("Slot creation failed");
                }
                toast.success("Slot created successfully");
                setOpen(false);
                form.reset();
                router.refresh();
            } catch (error) {
                toast.error("Failed to create slot");
            }
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Create New Slot
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106">
                <DialogHeader>
                    <DialogTitle>Create Availability</DialogTitle>
                    <DialogDescription>
                        Select the recurring slot details below.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-6 py-4"
                >
                    {/* Day Field */}
                    <form.Field
                        name="dayOfWeek"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field className="space-y-2">
                                    <Label>Day of the Week</Label>
                                    <Select
                                        onValueChange={field.handleChange}
                                        value={field.state.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dayOfWeek.map((day) => (
                                                <SelectItem
                                                    key={day}
                                                    value={day}
                                                >
                                                    {day}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        {/* Start Time */}
                        <form.Field
                            name="startTime"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Clock className="h-3 w-3" /> Start
                                        </Label>
                                        <Select
                                            onValueChange={field.handleChange}
                                            value={field.state.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="--:--:--" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {timeOptions.map((t) => (
                                                    <SelectItem
                                                        key={t}
                                                        value={t}
                                                    >
                                                        {t.slice(0, 5)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        {/* End Time */}
                        <form.Field
                            name="endTime"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Clock className="h-3 w-3" /> End
                                        </Label>
                                        <Select
                                            onValueChange={field.handleChange}
                                            value={field.state.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="--:--:--" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {timeOptions.map((t) => (
                                                    <SelectItem
                                                        key={t}
                                                        value={t}
                                                    >
                                                        {t.slice(0, 5)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </div>

                    <DialogFooter>
                        <form.Subscribe
                            selector={(state) => [
                                state.canSubmit,
                                state.isSubmitting,
                            ]}
                            children={([canSubmit, isSubmitting]) => (
                                <Button
                                    type="submit"
                                    disabled={!canSubmit || isSubmitting}
                                    className="w-full"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Save Availability"
                                    )}
                                </Button>
                            )}
                        />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SlotForm;
