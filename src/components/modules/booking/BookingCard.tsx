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
import {
    Clock,
    CreditCard,
    XCircle,
    Loader2,
    Link as LinkIcon,
    Star,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateBooking } from "@/actions/booking.actions";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BookingProps } from "@/service/booking.service";
import { Textarea } from "@/components/ui/textarea";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { createReview } from "@/actions/review.action";

type BookingCardProps = {
    booking: any;
    role?: "student" | "tutor";
    showCancel?: boolean;
};

export function BookingCard({
    booking,
    role = "student",
    showCancel = false,
}: BookingCardProps) {
    const [isPending, setIsPending] = useState(false);
    const [status, setStatus] = useState(booking.status);
    const [meetingLink, setMeetingLink] = useState(booking.meetingLink || "");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Review state
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    const router = useRouter();

    const handleUpdate = async (updates: BookingProps) => {
        setIsPending(true);
        try {
            const res = await updateBooking(booking.id, updates);
            if (!res.success) {
                return toast.error(res.message);
            }

            if (updates.status) setStatus(updates.status);
            if (updates.meetingLink) toast.success("Meeting link updated");
            else toast.success(`Booking ${updates.status} successfully`);

            setIsDialogOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await createReview(booking.id, rating, message);
        console.log(res);
        if (!res.success) {
            toast.error(res.error);
            return;
        }
        toast.success("Review submitted successfully!");

        setRating(0);
        setMessage("");
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
                    {/* Date Sidebar */}
                    <div className="flex flex-col items-center justify-center bg-muted/30 p-6 sm:w-32 border-b sm:border-b-0 sm:border-r">
                        <span className="text-xs text-muted-foreground uppercase">
                            {format(date, "MMM")}
                        </span>
                        <span className="text-3xl font-bold">
                            {format(date, "dd")}
                        </span>
                    </div>

                    {/* Main Content */}
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
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <CreditCard className="h-4 w-4" />$
                                        {booking.price}
                                    </div>
                                </div>

                                {booking.meetingLink && !isCancelled && (
                                    <a
                                        href={booking.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-blue-600 text-sm underline hover:text-blue-800"
                                    >
                                        <LinkIcon className="h-4 w-4" />
                                        Join Meeting
                                    </a>
                                )}
                            </div>

                            {/* ACTIONS */}
                            <div className="flex flex-col gap-2 min-w-35">
                                {/* Student/Tutor Cancel Dialog */}
                                {showCancel && !isCancelled && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                disabled={isPending}
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
                                                    This will cancel the session
                                                    scheduled for{" "}
                                                    {format(date, "PPP")} at{" "}
                                                    {format(date, "p")}.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Back
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    onClick={() =>
                                                        handleUpdate({
                                                            status: "CANCELLED",
                                                        })
                                                    }
                                                >
                                                    Confirm Cancellation
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}

                                {/* Tutor Specific Actions */}
                                {role === "tutor" && !isCancelled && (
                                    <>
                                        {status === "PENDING" && (
                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    size="sm"
                                                    disabled={isPending}
                                                    onClick={() =>
                                                        handleUpdate({
                                                            status: "CONFIRMED",
                                                        })
                                                    }
                                                >
                                                    {isPending && (
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    )}
                                                    Confirm
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    disabled={isPending}
                                                    onClick={() =>
                                                        handleUpdate({
                                                            status: "CANCELLED",
                                                        })
                                                    }
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        )}

                                        <Dialog
                                            open={isDialogOpen}
                                            onOpenChange={setIsDialogOpen}
                                        >
                                            <DialogTrigger asChild>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                >
                                                    {booking.meetingLink
                                                        ? "Edit Link"
                                                        : "Add Meeting Link"}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Session Meeting Link
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <div className="py-4">
                                                    <Input
                                                        placeholder="e.g: https://zoom.us/j/..."
                                                        value={meetingLink}
                                                        onChange={(e) =>
                                                            setMeetingLink(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        disabled={
                                                            isPending ||
                                                            !meetingLink
                                                        }
                                                        onClick={() =>
                                                            handleUpdate({
                                                                meetingLink,
                                                            })
                                                        }
                                                    >
                                                        {isPending && (
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        )}
                                                        Save Link
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review Section — only for students on non-cancelled bookings */}
                {status === "COMPLETED" && !isCancelled && (
                    <Collapsible className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                        <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-4 text-sm font-semibold transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <span>Leave a Review</span>
                            {/* Optional: Add a chevron icon that animates when open if your Collapsible supports state */}
                            {/* <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" /> */}
                        </CollapsibleTrigger>

                        <CollapsibleContent className="transition-all">
                            <div className="border-t px-6 py-6">
                                <form
                                    onSubmit={handleReviewSubmit}
                                    className="space-y-6"
                                >
                                    {/* Star Rating Section */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium leading-none text-foreground">
                                            Your Rating{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <div
                                            className="flex items-center gap-1.5"
                                            role="radiogroup"
                                            aria-label="Star Rating"
                                        >
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const isFilled =
                                                    star <=
                                                    (hoveredRating || rating);
                                                return (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        role="radio"
                                                        aria-checked={
                                                            rating === star
                                                        }
                                                        onClick={() =>
                                                            setRating(star)
                                                        }
                                                        onMouseEnter={() =>
                                                            setHoveredRating(
                                                                star,
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setHoveredRating(0)
                                                        }
                                                        className="rounded-sm p-0.5 transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                    >
                                                        <Star
                                                            className={`h-7 w-7 transition-colors ${
                                                                isFilled
                                                                    ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                                                                    : "text-muted-foreground/60 stroke-[1.5]"
                                                            }`}
                                                        />
                                                        <span className="sr-only">
                                                            {star} Star
                                                            {star > 1
                                                                ? "s"
                                                                : ""}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Review Textarea Section */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="message"
                                            className="text-sm font-medium leading-none text-foreground"
                                        >
                                            Your Review
                                        </label>
                                        <Textarea
                                            id="message"
                                            placeholder="Share your experience with this session..."
                                            value={message}
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                            className="min-h-30 resize-none focus-visible:ring-2"
                                            required
                                        />
                                    </div>

                                    {/* Actions Section */}
                                    <Button
                                        type="submit"
                                        className="w-full font-medium shadow-sm transition-all active:scale-[0.98]"
                                        disabled={rating === 0}
                                    >
                                        Submit Review
                                    </Button>
                                </form>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )}
            </CardContent>
        </Card>
    );
}
