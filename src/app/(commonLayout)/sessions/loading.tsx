import { Skeleton } from "@/components/ui/skeleton";

const SessionLoading = () => {
    // 6ti card er jonno dummy array
    const skeletonCards = Array.from({ length: 6 });

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header Section Skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-64" /> {/* Title */}
                    <Skeleton className="h-5 w-80" /> {/* Subtitle */}
                </div>
                {/* Status Filter Tabs Skeleton */}
                <div className="bg-muted/50 p-1 rounded-xl border w-fit flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-lg" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
            </div>

            {/* Search Bar Skeleton */}
            <div className="relative max-w-md">
                <Skeleton className="h-11 w-full rounded-md" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skeletonCards.map((_, i) => (
                    <div
                        key={i}
                        className="border rounded-2xl bg-card overflow-hidden space-y-4"
                    >
                        {/* Tutor Info Section */}
                        <div className="p-5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-12 w-12 rounded-full" />{" "}
                                    {/* Avatar */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />{" "}
                                        {/* Name */}
                                        <Skeleton className="h-3 w-16" />{" "}
                                        {/* Experience */}
                                    </div>
                                </div>
                                <Skeleton className="h-6 w-16 rounded-full" />{" "}
                                {/* Rate Badge */}
                            </div>

                            {/* Subject Badges */}
                            <div className="flex gap-1.5">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-10" />
                            </div>

                            {/* Slot Details (Day & Time) */}
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                            </div>

                            {/* Price & Time Range */}
                            <div className="flex justify-between items-center pt-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-5 w-20" />
                            </div>
                        </div>

                        {/* Button Section */}
                        <div className="px-5 pb-5">
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionLoading;
