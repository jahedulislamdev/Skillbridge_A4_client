"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Clock,
    CalendarDays,
    XCircle,
    Search,
    GraduationCap,
    ShoppingBag,
    BookOpen,
    Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

import Link from "next/link";
import { createBooking } from "@/actions/booking.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Slot = any;

const DAY_MAP: Record<string, string> = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
};

const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC", // Use UTC if your backend sends 1970-01-01 base dates
    });

// Helper to calculate hours and total price
const calculateSlotMetrics = (start: string, end: string, rate: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationHours = (endTime - startTime) / (1000 * 60 * 60);
    const totalPrice = durationHours * parseFloat(rate);
    return {
        duration: durationHours.toFixed(1),
        totalPrice: Math.round(totalPrice),
    };
};

export default function SlotsPage({ data }: { data: Slot[] }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"all" | "available" | "booked">(
        "available",
    );

    const slots = useMemo(() => data ?? [], [data]);

    const filtered = useMemo(
        () =>
            slots.filter((slot) => {
                const q = search.toLowerCase();
                const matchSearch =
                    !q ||
                    slot.tutor.user.name.toLowerCase().includes(q) ||
                    (DAY_MAP[slot.dayOfWeek] ?? "").toLowerCase().includes(q);
                const matchStatus =
                    status === "all" ||
                    (status === "available" && !slot.isBooked) ||
                    (status === "booked" && slot.isBooked);
                return matchSearch && matchStatus;
            }),
        [slots, search, status],
    );
    const router = useRouter();
    const handleBooking = async (slotId: string) => {
        const res = await createBooking(slotId);
        if (!res.success) {
            return toast.error(res.message);
        }
        toast.success("Session Booked successfully!");
        router.push("/sessions");
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Tutoring Slots
                    </h1>
                    <p className="text-muted-foreground">
                        Book 1-on-1 sessions with expert mentors.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-muted/50 p-1 rounded-xl border w-fit">
                    {(["all", "available", "booked"] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`px-4 py-1.5 rounded-lg text-sm capitalize transition-all ${
                                status === s
                                    ? "bg-background shadow-sm text-foreground font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search by tutor or day..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 h-11 bg-card shadow-sm"
                />
            </div>

            {/* Grid */}
            {!filtered.length ? (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl">
                    <p className="text-muted-foreground">
                        No slots found matching your criteria.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((slot) => {
                        const { duration, totalPrice } = calculateSlotMetrics(
                            slot.startTime,
                            slot.endTime,
                            slot.tutor.hourlyRate,
                        );

                        return (
                            <div
                                key={slot.id}
                                className="group relative border rounded-2xl bg-card overflow-hidden transition-all hover:shadow-xl hover:border-primary/20"
                            >
                                {/* Top Section: Tutor Info */}
                                <div className="p-5 space-y-4">
                                    <Link
                                        href={`/tutors/${slot.tutor.id}`}
                                        className="flex items-start justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                                <AvatarImage
                                                    src={slot.tutor.user.image}
                                                />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {slot.tutor.user.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-bold text-foreground leading-none">
                                                    {slot.tutor.user.name}
                                                </h3>
                                                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                                    <GraduationCap className="w-3 h-3" />
                                                    <span>
                                                        {slot.tutor
                                                            .experienceYears ||
                                                            "Entry"}{" "}
                                                        yrs exp.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="font-bold text-primary"
                                        >
                                            ৳{slot.tutor.hourlyRate}/hr
                                        </Badge>
                                    </Link>

                                    {/* Subject List */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {slot.tutor.tutorSubjects.length > 0 ? (
                                            slot.tutor.tutorSubjects.map(
                                                (sub: any, i: number) => (
                                                    <Badge
                                                        key={i}
                                                        variant="outline"
                                                        className="text-[10px] uppercase font-bold tracking-wider py-0 px-2 bg-primary/5"
                                                    >
                                                        {sub}
                                                    </Badge>
                                                ),
                                            )
                                        ) : (
                                            <span className="text-[11px] text-muted-foreground italic flex items-center gap-1">
                                                <BookOpen className="w-3 h-3" />{" "}
                                                General Mentorship
                                            </span>
                                        )}
                                    </div>

                                    {/* Slot Details */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-transparent group-hover:border-muted">
                                            <CalendarDays className="w-4 h-4 text-primary" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                                                    Day
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {DAY_MAP[slot.dayOfWeek]}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-transparent group-hover:border-muted">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                                                    Time
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {duration} Hours
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm px-1">
                                        <span className="text-muted-foreground">
                                            {formatTime(slot.startTime)} -{" "}
                                            {formatTime(slot.endTime)}
                                        </span>
                                        <div className="flex items-center gap-1 font-bold text-foreground">
                                            <Banknote className="w-4 h-4 text-emerald-500" />
                                            <span>Total: ৳{totalPrice}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="px-5 pb-5 mt-auto">
                                    {slot.isBooked ? (
                                        <Button
                                            disabled
                                            variant="outline"
                                            className="w-full bg-muted/50 border-dashed text-muted-foreground cursor-not-allowed"
                                        >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Already Booked
                                        </Button>
                                    ) : (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="w-full shadow-lg shadow-primary/20 group-hover:scale-[1.02] transition-transform">
                                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                                    Book this Slot
                                                </Button>
                                            </DialogTrigger>

                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Confirm Booking
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        You are booking a 1-on-1
                                                        session with{" "}
                                                        {slot.tutor.user.name}.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                {/* Checkout Style Info Section */}
                                                <div className="mt-4 space-y-4 border rounded-xl p-4 bg-muted/30">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            Tutor
                                                        </span>
                                                        <span className="font-medium">
                                                            {
                                                                slot.tutor.user
                                                                    .name
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            Day
                                                        </span>
                                                        <span className="font-medium">
                                                            {
                                                                DAY_MAP[
                                                                    slot
                                                                        .dayOfWeek
                                                                ]
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            Time
                                                        </span>
                                                        <span className="font-medium">
                                                            {formatTime(
                                                                slot.startTime,
                                                            )}{" "}
                                                            -{" "}
                                                            {formatTime(
                                                                slot.endTime,
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="border-t pt-3 flex justify-between items-center">
                                                        <span className="font-semibold">
                                                            Total Price
                                                        </span>
                                                        <span className="text-xl font-bold text-primary">
                                                            ৳
                                                            {
                                                                calculateSlotMetrics(
                                                                    slot.startTime,
                                                                    slot.endTime,
                                                                    slot.tutor
                                                                        .hourlyRate,
                                                                ).totalPrice
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        // Add your booking logic here (e.g., API call)
                                                        console.log(
                                                            "Booking slot:",
                                                            slot.id,
                                                        );
                                                    }}
                                                >
                                                    <div className="py-4">
                                                        {/* You can add a Note textarea here if needed */}
                                                        <p className="text-[11px] text-center text-muted-foreground">
                                                            By confirming, you
                                                            agree to our 24-hour
                                                            cancellation policy.
                                                        </p>
                                                    </div>

                                                    <DialogFooter className="gap-2 sm:gap-0">
                                                        <DialogClose asChild>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                        <Button
                                                            type="submit"
                                                            className="px-8"
                                                            onClick={() =>
                                                                handleBooking(
                                                                    slot.id,
                                                                )
                                                            }
                                                        >
                                                            Confirm & Pay
                                                        </Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
