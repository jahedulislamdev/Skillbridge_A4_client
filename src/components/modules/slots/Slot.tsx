"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SlotCard from "./SlotCard";
import { dayMap } from "@/helper/slots.helper";

type Slot = any;

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
                    slot.tutor?.user?.name.toLowerCase().includes(q) ||
                    (dayMap[slot.dayOfWeek] ?? "").toLowerCase().includes(q);
                const matchStatus =
                    status === "all" ||
                    (status === "available" && !slot.isBooked) ||
                    (status === "booked" && slot.isBooked);
                return matchSearch && matchStatus;
            }),
        [slots, search, status],
    );

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

            {/* Grid slot container */}
            <SlotCard data={filtered} />
        </div>
    );
}
