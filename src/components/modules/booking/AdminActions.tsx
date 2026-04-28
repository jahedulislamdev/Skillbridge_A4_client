"use client";

import { useState } from "react";
import { toast } from "sonner"; // or your preferred toast library
import {
    MoreHorizontal,
    Link as LinkIcon,
    Save,
    Loader2,
    Edit,
} from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateBooking } from "@/actions/booking.actions";
import { useRouter } from "next/navigation";

const BookingStatus = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

interface AdminActionProps {
    bookingId: string; // Needed for the API call
    status: string;
    meetingLink: string | null;
}

const AdminActions = ({ bookingId, status, meetingLink }: AdminActionProps) => {
    const [isPending, setIsPending] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);
    const [link, setLink] = useState(meetingLink || "");
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleUpdate = async () => {
        setIsPending(true);
        try {
            // Replace with your actual service call
            // await bookingService.updateBooking(bookingId, { status: currentStatus, meetingLink: link });
            const res = await updateBooking(bookingId, {
                status: currentStatus,
                meetingLink: link,
            });
            if (!res.success) {
                return toast.error(res.message);
            }
            toast.success("Booking updated successfully");
            setOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update booking");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106">
                <DialogHeader>
                    <DialogTitle>Update Booking</DialogTitle>
                    <DialogDescription>
                        Modify the session status and provide the virtual
                        meeting link here.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Status Selection */}
                    <div className="grid gap-2">
                        <Label htmlFor="status">Session Status</Label>
                        <Select
                            defaultValue={currentStatus}
                            onValueChange={setCurrentStatus}
                        >
                            <SelectTrigger id="status" className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {BookingStatus.map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Meeting Link Input */}
                    <div className="grid gap-2">
                        <Label
                            htmlFor="meeting-link"
                            className="flex items-center gap-2"
                        >
                            <LinkIcon className="h-3 w-3" /> Meeting Link
                        </Label>
                        <Input
                            value={link}
                            id="meeting-link"
                            placeholder="https://zoom.us/j/..."
                            className="lowercase"
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleUpdate}
                        disabled={isPending}
                        className="min-w-25"
                    >
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AdminActions;
