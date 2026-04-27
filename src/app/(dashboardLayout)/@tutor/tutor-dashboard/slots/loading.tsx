import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SlotsLoading = () => {
    // 3ti card loop korar jonno (standard grid fill korar jonno)
    const skeletonSlots = Array.from({ length: 3 });

    return (
        <div className="container max-w-5xl py-8 space-y-6">
            {/* Header Skeleton */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-62.5" /> {/* Title */}
                    <Skeleton className="h-4 w-75" /> {/* Description */}
                </div>
                <Skeleton className="h-10 w-full sm:w-35" />{" "}
                {/* Create Button */}
            </div>

            <Separator />

            {/* Slots Grid Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skeletonSlots.map((_, i) => (
                    <Card key={i} className="hover:shadow-sm">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-2 flex-1">
                                {/* Day of Week */}
                                <Skeleton className="h-6 w-24" />
                                {/* Status Badge */}
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                            {/* Clock Icon Circle */}
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Time Range (startTime - endTime) */}
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-5 w-16" />
                            </div>

                            {/* ID and Action Button Row */}
                            <div className="flex items-center justify-between pt-2">
                                <Skeleton className="h-3 w-20" />{" "}
                                {/* Mono ID */}
                                <Skeleton className="h-8 w-8 rounded-md" />{" "}
                                {/* Delete Icon Button */}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SlotsLoading;
