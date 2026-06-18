import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function TutorListSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 md:py-12 space-y-8">
                {/* ── Header Section Skeleton ── */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-2">
                        {/* Title Mock */}
                        <Skeleton className="h-9 w-64 md:w-80" />
                        {/* Subtitle Mock */}
                        <Skeleton className="h-4 w-48 md:w-56" />
                    </div>

                    {/* Controls Bar Mock */}
                    <div className="flex gap-3 items-center w-full lg:w-auto">
                        <div className="flex-1 lg:w-72">
                            {/* Search Box Mock */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="md:hidden">
                            {/* Mobile Filter Button Mock */}
                            <Skeleton className="h-10 w-10 shrink-0" />
                        </div>
                    </div>
                </header>

                <Separator className="bg-border/60" />

                {/* ── Main Content Layout Skeleton ── */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Desktop Sidebar Filter Skeleton */}
                    <aside className="hidden md:block sticky top-24 shrink-0 w-64 space-y-6">
                        <Skeleton className="h-6 w-24 mb-4" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-3/4" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    </aside>

                    {/* Cards Grid Skeleton */}
                    <main className="flex-1 w-full space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4 md:px-0">
                            {/* Rendering 6 mock tutor cards */}
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-5 space-y-4"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Avatar Circle */}
                                        <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                                        <div className="space-y-2 flex-1">
                                            {/* Name & Subject lines */}
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </div>
                                    {/* Bio/Details paragraphs */}
                                    <div className="space-y-2 pt-2">
                                        <Skeleton className="h-3 w-full" />
                                        <Skeleton className="h-3 w-full" />
                                        <Skeleton className="h-3 w-2/3" />
                                    </div>
                                    {/* Footer/Button line */}
                                    <div className="flex justify-between items-center pt-2">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-8 w-24 rounded-md" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Mock */}
                        <div className="pt-4 border-t flex justify-between items-center">
                            <Skeleton className="h-9 w-20" />
                            <Skeleton className="h-4 w-32 hidden sm:block" />
                            <Skeleton className="h-9 w-20" />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
