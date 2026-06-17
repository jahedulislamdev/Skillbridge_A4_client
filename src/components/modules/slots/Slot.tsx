"use client";

import SlotCard from "./SlotCard";
import SearchBox from "@/components/layout/Search";
import { Search } from "lucide-react";

type Slot = any;

export default function SlotsPage({ data }: { data: Slot[] }) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Available Sessions
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Book structured 1-on-1 mentoring slots with experienced
                        tutors.
                    </p>
                </div>
                <SearchBox placeholder="Search tutor or subject..." />
            </div>

            {/* Main Content Area */}
            <div>
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-xl bg-muted/30 px-4">
                        <p className="text-sm font-medium text-foreground">
                            No slots found
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Try adjusting your search criteria.
                        </p>
                    </div>
                ) : (
                    <SlotCard data={data} />
                )}
            </div>
        </div>
    );
}
