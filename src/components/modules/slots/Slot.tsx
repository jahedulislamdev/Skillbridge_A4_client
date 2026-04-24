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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    });

export default function SlotsPage({ data }: { data: Slot[] }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"all" | "available" | "booked">("all");

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

    if (!slots.length) {
        return (
            <div className="flex items-center justify-center h-[60vh] text-muted-foreground text-sm">
                No slots available
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Available Slots</h1>
                <span className="text-xs text-muted-foreground">
                    {filtered.length} of {slots.length} slots
                </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    <Input
                        placeholder="Search tutor or day…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 h-8 text-sm"
                    />
                </div>
                <div className="flex items-center border rounded-lg overflow-hidden text-xs">
                    {(["all", "available", "booked"] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`px-3 py-1.5 capitalize transition-colors ${
                                status === s
                                    ? "bg-foreground text-background font-medium"
                                    : "text-muted-foreground hover:bg-muted/60"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                    No slots match your filters
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filtered.map((slot) => (
                        <div
                            key={slot.id}
                            className="border rounded-xl p-4 space-y-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-card"
                        >
                            {/* Top row: avatar + name + rate */}
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden  `}
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src={slot.tutor.user.image}
                                            />
                                            <AvatarFallback>
                                                {slot.tutor.user.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold truncate leading-tight">
                                            {slot.tutor.user.name}
                                        </p>
                                        {slot.tutor.experienceYears > 0 && (
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <GraduationCap className="w-3 h-3" />
                                                {slot.tutor.experienceYears} yrs
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="text-xs shrink-0"
                                >
                                    ৳{slot.tutor.hourlyRate}/hr
                                </Badge>
                            </div>

                            {/* Divider */}
                            <div className="border-t" />

                            {/* Day + time */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                                    <span>{DAY_MAP[slot.dayOfWeek]}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Clock className="w-3.5 h-3.5 shrink-0" />
                                    <span>
                                        {formatTime(slot.startTime)} –{" "}
                                        {formatTime(slot.endTime)}
                                    </span>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                {slot.isBooked ? (
                                    <Badge className="bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 gap-1 text-xs w-full justify-center py-3">
                                        <XCircle className="w-3 h-3" />
                                        Booked
                                    </Badge>
                                ) : (
                                    <Button className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 gap-1 text-xs w-full justify-center py-1">
                                        <ShoppingBag className="w-3 h-3" />
                                        Book Now
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
