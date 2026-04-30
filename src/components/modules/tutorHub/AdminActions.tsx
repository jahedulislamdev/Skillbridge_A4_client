"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Check,
    Eye,
    X,
    Star,
    Clock,
    GraduationCap,
    Loader2,
} from "lucide-react";
import { updateTutor } from "@/actions/tutor.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminActionsInTutors({ tutor }: { tutor: any }) {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleTutorActions = async (status: string) => {
        setIsPending(true);
        try {
            const res = await updateTutor(tutor.id, { status });

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success(`Tutor ${status.toLowerCase()} successfully!`);
            setOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Tutor Application Review</DialogTitle>
                    <DialogDescription>
                        Carefully review the profile before changing the status.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border">
                            <AvatarImage
                                src={tutor.user?.image}
                                alt={tutor.user?.name}
                            />
                            <AvatarFallback>
                                {tutor.user?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold capitalize">
                                {tutor.user?.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="secondary">
                                    {tutor.status}
                                </Badge>
                                <span>•</span>
                                <div className="flex items-center">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                                    {tutor.averageRating} ({tutor.totalReviews}{" "}
                                    reviews)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1 p-3 border rounded-lg">
                            <p className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Clock className="w-3 h-3" /> Hourly Rate
                            </p>
                            <p className="font-semibold text-lg">
                                ৳{tutor.hourlyRate}
                            </p>
                        </div>
                        <div className="space-y-1 p-3 border rounded-lg">
                            <p className="text-muted-foreground flex items-center gap-1 text-xs">
                                <GraduationCap className="w-3 h-3" /> Experience
                            </p>
                            <p className="font-semibold text-lg">
                                {tutor.experienceYears} Years
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-semibold underline decoration-primary/30">
                            Subjects
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {tutor.tutorSubjects?.map((sub: any) => (
                                <Badge
                                    key={sub.subjects.id}
                                    variant="outline"
                                    className="bg-muted/50"
                                >
                                    {sub.subjects.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-semibold underline decoration-primary/30">
                            About / Bio
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 pl-3">
                            "{tutor.bio}"
                        </p>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <div className="flex w-full justify-between gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>

                        <div className="flex gap-2">
                            <Button
                                variant="destructive"
                                className="gap-2"
                                disabled={
                                    isPending || tutor.status === "PENDING"
                                }
                                onClick={() => handleTutorActions("PENDING")}
                            >
                                {isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <X className="h-4 w-4" />
                                )}
                                Reject
                            </Button>
                            <Button
                                className="bg-emerald-700 hover:bg-emerald-800 gap-2 text-white"
                                disabled={
                                    isPending || tutor.status === "APPROVED"
                                }
                                onClick={() => handleTutorActions("APPROVED")}
                            >
                                {isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Check className="h-4 w-4" />
                                )}
                                Approve
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
