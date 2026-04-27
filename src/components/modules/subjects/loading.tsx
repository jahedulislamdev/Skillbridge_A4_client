import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SubjectLoading = () => {
    // 8 ti card dekhanor jonno array (standard grid fill korar jonno)
    const skeletonCards = Array.from({ length: 8 });

    return (
        <div className="space-y-8 w-full container max-w-7xl py-6">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-50" /> {/* Title */}
                    <Skeleton className="h-4 w-37.5" /> {/* Count Text */}
                </div>
                <Skeleton className="h-10 w-full sm:w-35" /> {/* Add Button */}
            </div>

            {/* Subject Cards Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {skeletonCards.map((_, i) => (
                    <Card
                        key={i}
                        className="border-muted-foreground/10 shadow-sm"
                    >
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                {/* Book Icon Box */}
                                <Skeleton className="h-9 w-9 rounded-lg" />
                                {/* Action Buttons (Edit/Delete) */}
                                <div className="flex gap-1">
                                    <Skeleton className="h-8 w-8 rounded-md" />
                                    <Skeleton className="h-8 w-8 rounded-md" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4 space-y-3">
                            {/* Subject Name */}
                            <Skeleton className="h-6 w-[70%]" />
                            {/* ID/Hash text */}
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-3 w-3 rounded-full" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SubjectLoading;
