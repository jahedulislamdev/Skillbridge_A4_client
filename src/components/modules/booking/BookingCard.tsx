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
import { Clock, CreditCard, XCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BookingStatus } from "@/constants/bookingStatus";
import { updateBooking } from "@/actions/booking.actions";

export function BookingCard({ booking }: { booking: any }) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleCancel = async () => {
        setIsPending(true);
        try {
            const res = await updateBooking(booking.id, {
                status: BookingStatus.CANCELLED,
            });
            if (!res.success) {
                return toast.error(res?.data.message);
            }
            toast.success("Booking cancelled successfully");
            router.refresh();
        } catch (error) {
            toast.error("Failed to cancel booking");
        } finally {
            setIsPending(false);
        }
    };

    const date = new Date(booking.scheduledAt);
    const isCancelled = booking.status === BookingStatus.CANCELLED;

    const statusStyles: Record<string, string> = {
        PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
        CONFIRMED: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
        CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
    };

    return (
        <Card
            className={`overflow-hidden transition-all ${isCancelled ? "opacity-60 grayscale-[0.5]" : "hover:shadow-md"}`}
        >
            <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                    {/* Date Block */}
                    <div className="flex flex-col items-center justify-center bg-muted/30 p-6 sm:w-32 border-b sm:border-b-0 sm:border-r">
                        <span className="text-xs font-medium text-muted-foreground uppercase">
                            {format(date, "MMM")}
                        </span>
                        <span className="text-3xl font-bold">
                            {format(date, "dd")}
                        </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className={statusStyles[booking.status]}
                                    >
                                        {booking.status}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {format(date, "p")}
                                    </span>
                                </div>

                                <div className="space-y-1">
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
                            </div>

                            {/* Cancel Button - Only show if not already cancelled */}
                            {!isCancelled && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Cancel
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will cancel your session
                                                scheduled for{" "}
                                                {format(date, "PPP")}. This
                                                action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Go Back
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleCancel}
                                                className="bg-red-800 text-white"
                                            >
                                                {isPending ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    "Confirm Cancellation"
                                                )}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
