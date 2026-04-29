"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Clock, CreditCard, XCircle, Loader2, Link } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateBooking } from "@/actions/booking.actions";

type BookingCardProps = {
    booking: any;
    role?: "student" | "tutor";
    showCancel?: boolean;
    onStatusChange?: (id: string, status: string) => Promise<void>;
    onAddMeetingLink?: (id: string) => void;
};

export function BookingCard({
    booking,
    role = "student",
    showCancel = false,
    onStatusChange,
    onAddMeetingLink,
}: BookingCardProps) {
    const [isPending, setIsPending] = useState(false);
    const [status, setStatus] = useState(booking.status);
    const router = useRouter();

    //* we can't pass event hander in server component that's why I write it maually here
    const handleCancel = async () => {
        setIsPending(true);
        try {
            const res = await updateBooking(booking.id, {
                status: "CANCELLED",
            });
            if (!res.success) {
                return toast.error(res.message);
            }
            setStatus("CANCELLED");
            toast.success("Booking cancelled successfully");
            router.refresh();
        } catch (error) {
            toast.error("Failed to cancel booking");
        } finally {
            setIsPending(false);
        }
    };

    const handleStatus = async (status: string) => {
        if (!onStatusChange) return;

        setIsPending(true);
        try {
            await onStatusChange(booking.id, status);
            toast.success(`Booking ${status}`);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setIsPending(false);
        }
    };

    const date = new Date(booking.scheduledAt);
    const isCancelled = status === "CANCELLED";

    const statusStyles: Record<string, string> = {
        PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
        CONFIRMED: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
        CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
    };

    return (
        <Card
            className={`overflow-hidden transition-all ${
                isCancelled ? "opacity-60 grayscale-[0.5]" : "hover:shadow-md"
            }`}
        >
            <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                    {/* Date */}
                    <div className="flex flex-col items-center justify-center bg-muted/30 p-6 sm:w-32 border-b sm:border-b-0 sm:border-r">
                        <span className="text-xs text-muted-foreground uppercase">
                            {format(date, "MMM")}
                        </span>
                        <span className="text-3xl font-bold">
                            {format(date, "dd")}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className={statusStyles[status]}
                                    >
                                        {status}
                                    </Badge>

                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {format(date, "p")}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Tutoring Session
                                    </h3>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <CreditCard className="h-4 w-4" />$
                                            {booking.price}
                                        </div>
                                    </div>
                                </div>

                                {/* Meeting Link */}
                                {booking.meetingLink && (
                                    <a
                                        href={booking.meetingLink}
                                        target="_blank"
                                        className="flex items-center gap-1 text-blue-600 text-sm underline"
                                    >
                                        <Link className="h-4 w-4" />
                                        Join Meeting
                                    </a>
                                )}
                            </div>

                            {/* ACTIONS */}
                            <div className="flex flex-col gap-2">
                                {/* Student Cancel */}
                                {showCancel && !isCancelled && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive"
                                            >
                                                <XCircle className="mr-2 h-4 w-4" />
                                                Cancel
                                            </Button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cancel session on{" "}
                                                    {format(date, "PPP")}
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Back
                                                </AlertDialogCancel>

                                                <AlertDialogAction
                                                    onClick={handleCancel}
                                                >
                                                    {isPending ? (
                                                        <Loader2 className="animate-spin h-4 w-4" />
                                                    ) : (
                                                        "Confirm"
                                                    )}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}

                                {/* Tutor Actions */}
                                {role === "tutor" && (
                                    <>
                                        {status === "PENDING" && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        handleStatus(
                                                            "CONFIRMED",
                                                        )
                                                    }
                                                >
                                                    Confirm
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleStatus(
                                                            "CANCELLED",
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        )}

                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() =>
                                                onAddMeetingLink?.(booking.id)
                                            }
                                        >
                                            Add Meeting Link
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
