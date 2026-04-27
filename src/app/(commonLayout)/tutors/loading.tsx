import { TutorCardSkeleton } from "@/components/modules/tutorHub/TutorCardSkeleton";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function TutorHubLoading() {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12 space-y-8">
                {/* Header Section */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <Skeleton className="h-10 md:h-12 w-64 md:w-[450px]" />
                        <Skeleton className="h-4 w-full max-w-md" />
                    </div>

                    {/* StatPill Skeleton */}
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm min-w-[120px]">
                            <Skeleton className="h-8 w-8 rounded-lg" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-8" />
                                <Skeleton className="h-2 w-12" />
                            </div>
                        </div>
                    </div>
                </header>

                <Separator className="bg-border/60" />

                {/* Search Bar Skeleton */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-full sm:flex-1">
                        <Skeleton className="h-10 w-full max-w-sm rounded-xl" />
                    </div>
                    <div className="md:hidden w-full">
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar Filter Skeleton */}
                    <aside className="hidden md:block sticky top-24 shrink-0">
                        <div className="w-72 rounded-2xl border bg-card p-4 space-y-6">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                            <Separator />
                            <div className="space-y-3">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-10 w-full rounded-xl" />
                                <Skeleton className="h-10 w-full rounded-xl" />
                                <Skeleton className="h-10 w-full rounded-xl" />
                            </div>
                            <Separator />
                            <Skeleton className="h-32 w-full rounded-xl" />
                            <Skeleton className="h-10 w-full rounded-xl mt-4" />
                        </div>
                    </aside>

                    {/* Grid Area */}
                    <main className="flex-1 w-full space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4 md:px-0">
                            {/* Render 6 skeleton cards */}
                            {[...Array(6)].map((_, i) => (
                                <TutorCardSkeleton key={i} />
                            ))}
                        </div>

                        {/* Pagination Skeleton */}
                        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                            <Skeleton className="h-4 w-48" />
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        className="h-9 w-9 rounded-md"
                                    />
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
