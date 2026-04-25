"use client";

import { useForm } from "@tanstack/react-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import { updateUser } from "@/actions/user.actions";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string().url("Must be a valid image URL").or(z.literal("")),
});

export default function ProfileForm({ user }: { user: any }) {
    const form = useForm({
        defaultValues: {
            name: user.name || "",
            image: user.image || "",
        },
        validators: {
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const res = await updateUser(user.id, value);
                if (!res?.data.success) {
                    return toast.error(res?.error.message);
                }
                // console.log("Submitted:", value);
                toast.success("Profile updated successfully");
            } catch (error) {
                toast.error("Failed to update profile");
            }
        },
    });

    return (
        /* Removed w-lg to allow parent Card to control width. 
       Added w-full to ensure it fills the Card. */
        <div className="space-y-8 w-full">
            {/* Avatar Section: Centered on mobile, start-aligned on desktop */}
            <form.Subscribe
                selector={(state) => [state.values.name, state.values.image]}
                children={([name, image]) => (
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                        <Avatar className="h-24 w-24 border-2 border-background shadow-sm">
                            <AvatarImage src={image} alt={name} />
                            <AvatarFallback className="text-xl font-bold bg-muted">
                                {name?.slice(0, 1).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 text-center sm:text-left">
                            <h4 className="text-sm font-medium">
                                Profile Picture
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                A preview of how your avatar looks.
                            </p>
                        </div>
                    </div>
                )}
            />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-6"
            >
                <div className="grid gap-6">
                    {/* Name Field */}
                    <form.Field
                        name="name"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Display Name</Label>
                                <Input
                                    id={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    placeholder="Your name"
                                    className="h-11" // Slightly taller for better touch targets
                                />
                                {field.state.meta.errors && (
                                    <p className="text-xs font-medium text-destructive">
                                        {field.state.meta.errors.join(", ")}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Image URL Field */}
                    <form.Field
                        name="image"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    Profile Image URL
                                </Label>
                                <Input
                                    id={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    placeholder="https://example.com/avatar.png"
                                    className="h-11"
                                />
                                {field.state.meta.errors && (
                                    <p className="text-xs font-medium text-destructive">
                                        {field.state.meta.errors.join(", ")}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Static Email */}
                    <div className="space-y-2">
                        <Label className="text-muted-foreground">
                            Email Address
                        </Label>
                        <Input
                            value={user.email}
                            disabled
                            className="h-11 bg-muted/50 cursor-not-allowed opacity-80"
                        />
                        <p className="text-[12px] text-muted-foreground italic">
                            Managed by your provider and cannot be changed.
                        </p>
                    </div>
                </div>

                {/* Action Button: Full width on mobile, auto on desktop */}
                <div className="pt-4 flex flex-col sm:flex-row sm:justify-end">
                    <form.Subscribe
                        selector={(state) => [
                            state.canSubmit,
                            state.isSubmitting,
                            state.isDirty,
                        ]}
                        children={([canSubmit, isSubmitting, isDirty]) => (
                            <Button
                                variant="default" // Changed to default for better visibility
                                type="submit"
                                disabled={
                                    !canSubmit || !isDirty || isSubmitting
                                }
                                className="h-11 px-8 w-full sm:w-auto"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Changes"
                                )}
                            </Button>
                        )}
                    />
                </div>
            </form>
        </div>
    );
}
