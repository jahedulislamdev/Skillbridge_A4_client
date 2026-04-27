import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AnalyticsLoading = () => {
    return (
        <div className="container max-w-7xl py-2 space-y-8">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-10 w-62" />
                <Skeleton className="h-4 w-87" />
            </div>

            {/* Metric Cards Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="shadow-sm border-none bg-muted/40">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="shadow-sm border-none bg-muted/40">
                        <CardHeader>
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent>
                            {/* Box representing the chart area */}
                            <Skeleton className="h-[300px] w-full rounded-xl" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AnalyticsLoading;
