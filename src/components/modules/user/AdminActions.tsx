"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit, Loader2, Save, UserCog, ShieldCheck, Ban } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
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
import { updateUser } from "@/actions/user.actions";
import { Irish_Grover } from "next/font/google";

interface AdminActionsUserProps {
    userId: string;
    initialRole: string;
    initialVerified: boolean;
    initialIsBanned: boolean;
}

export function AdminActionsUser({
    userId,
    initialRole,
    initialVerified,
    initialIsBanned,
}: AdminActionsUserProps) {
    const [isPending, setIsPending] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Form State
    const [role, setRole] = useState(initialRole);
    const [verified, setVerified] = useState(
        initialVerified ? "true" : "false",
    );
    const [isBanned, setIsBanned] = useState(
        initialIsBanned ? "true" : "false",
    );

    const handleUpdate = async () => {
        setIsPending(true);
        try {
            // Logic: Convert string booleans back to actual booleans for API
            const payload = {
                role,
                emailVerified: verified === "true",
                isBanned: isBanned === "true",
            };

            const res = await updateUser(userId, payload);
            if (!res.success) {
                return toast.error(res.message);
            }
            toast.success("User permissions updated");
            setOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update user");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserCog className="h-5 w-5" />
                        Manage User Account
                    </DialogTitle>
                    <DialogDescription>
                        Update the administrative status and permissions for
                        this user.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Role Selection */}
                    <div className="grid gap-2">
                        <Label htmlFor="role" className="text-sm font-medium">
                            User Role
                        </Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="TUTOR">Tutor</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Email verification */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="verified"
                                className="flex items-center gap-2"
                            >
                                <ShieldCheck className="h-3 w-3" />
                                Email Verification
                            </Label>
                            <Select
                                value={verified}
                                onValueChange={setVerified}
                            >
                                <SelectTrigger id="verified">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">
                                        Verified
                                    </SelectItem>
                                    <SelectItem value="false">
                                        Pending
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Banned user manual */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="banned"
                                className="flex items-center gap-2"
                            >
                                <Ban className="h-3 w-3" /> Access Status
                            </Label>
                            <Select
                                value={isBanned}
                                onValueChange={setIsBanned}
                            >
                                <SelectTrigger id="banned">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="false" className="text-">
                                        Active
                                    </SelectItem>
                                    <SelectItem
                                        value="true"
                                        className="text-destructive"
                                    >
                                        Banned
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" type="button">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleUpdate}
                        disabled={isPending}
                        className="min-w-30"
                    >
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Update User
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
