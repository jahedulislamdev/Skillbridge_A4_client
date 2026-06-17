"use client";

export default function SlotsPageSkeleton() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">
            {/* Header Section Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
                <div className="space-y-2 w-full">
                    {/* Title Skeleton */}
                    <div className="h-8 w-48 bg-muted rounded-md" />
                    {/* Subtitle Skeleton */}
                    <div className="h-4 w-64 md:w-80 bg-muted/70 rounded-md" />
                </div>

                {/* Search Input Skeleton */}
                <div className="h-10 w-full md:max-w-xs bg-muted rounded-lg shrink-0" />
            </div>

            {/* Main Content Area (Slot Cards Skeleton) */}
            {/* Assuming a responsive 3-column grid for the cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col border rounded-xl p-5 space-y-4 bg-card"
                    >
                        {/* Card Header (e.g., Tutor Name & Subject) */}
                        <div className="space-y-2">
                            <div className="h-5 w-3/4 bg-muted rounded-md" />
                            <div className="h-4 w-1/2 bg-muted/70 rounded-md" />
                        </div>

                        {/* Card Body (e.g., Time slots / Info tags) */}
                        <div className="flex gap-2 pt-2">
                            <div className="h-6 w-16 bg-muted/60 rounded-full" />
                            <div className="h-6 w-16 bg-muted/60 rounded-full" />
                        </div>

                        {/* Card Action (e.g., Book Button) */}
                        <div className="h-9 w-full bg-muted rounded-md mt-auto pt-2" />
                    </div>
                ))}
            </div>
        </div>
    );
}
