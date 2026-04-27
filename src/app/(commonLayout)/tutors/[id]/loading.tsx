import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const TutorDetailsSkeleton = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Top Nav Skeleton */}
            <div className="border-b bg-card/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column (8 cols) */}
                    <div className="lg:col-span-8 space-y-10">
                        <section className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar Skeleton */}
                            <Skeleton className="h-32 w-32 md:h-44 md:w-44 rounded-full border-4 border-background" />

                            <div className="flex-1 space-y-4 pt-2 w-full">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-64" />
                                        <Skeleton className="h-6 w-24 rounded-full" />
                                    </div>
                                    <Skeleton className="h-6 w-40" />
                                </div>

                                <div className="flex gap-x-8">
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-6 w-32" />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <Skeleton className="h-4 w-28" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-20" />
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-8 w-16" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Separator />

                        {/* Tabs Skeleton */}
                        <div className="space-y-6">
                            <div className="flex gap-8 border-b pb-2">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-24 w-full rounded-xl" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-4">
                        <Card className="shadow-none border-primary/10">
                            <div className="p-8 space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-10 w-24" />
                                    </div>
                                    <Skeleton className="h-10 w-24 rounded-full" />
                                </div>
                                <div className="space-y-4">
                                    <Skeleton className="h-12 w-full rounded-lg" />
                                    <Skeleton className="h-12 w-full rounded-lg" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-full" />
                                    <Skeleton className="h-3 w-2/3 mx-auto" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TutorDetailsSkeleton;
