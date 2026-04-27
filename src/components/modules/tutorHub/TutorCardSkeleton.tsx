import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function TutorCardSkeleton() {
    return (
        <Card className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-0 h-full">
            <CardContent className="flex flex-col flex-1 gap-4 p-5">
                {/* Top row: Avatar & Price */}
                <div className="flex items-start justify-between gap-3">
                    <div className="relative shrink-0">
                        {/* Avatar Skeleton */}
                        <Skeleton className="h-14 w-14 rounded-2xl" />
                        {/* Status Dot Skeleton */}
                        <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-muted" />
                    </div>
                    {/* Price Badge Skeleton */}
                    <Skeleton className="h-6 w-16 rounded-lg" />
                </div>

                {/* Name & Experience */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>

                {/* Subject Badges */}
                <div className="flex flex-wrap gap-1.5">
                    <Skeleton className="h-5 w-14 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                {/* Bio Skeleton */}
                <div className="space-y-1.5">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                </div>

                {/* Rating Row */}
                <div className="mt-auto flex items-center justify-between pt-2">
                    <Skeleton className="h-6 w-12 rounded-md" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </CardContent>

            <Separator className="opacity-50" />

            {/* Footer Actions */}
            <CardFooter className="p-3 bg-muted/20 flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
            </CardFooter>
        </Card>
    );
}
