import { tutorService } from "@/service/tutor.service";
import { BookOpen, Users } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { PaginationController } from "@/components/layout/Pagination";
import { TutorCard } from "@/components/modules/tutorHub/TutorCard";
import SearchBox from "@/components/layout/Search";
import { TutorFilters } from "@/components/modules/tutorHub/TutorFilter";
import FilterSheet from "@/components/modules/tutorHub/FilterSheet";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tutor Hub",
};

export default async function TutorHub({
    searchParams,
}: {
    searchParams: Promise<{
        search: string;
        page: string;
        limit: string;
        rating: number;
        priceMin: number;
        priceMax: number;
    }>;
}) {
    const { limit, page, rating, search, priceMin, priceMax } =
        await searchParams;

    const { data } = await tutorService.getTutors(
        {
            limit,
            search,
            page,
            rating,
            priceMin,
            priceMax,
        },
        { revalidate: 60 },
    );

    const tutors: any[] = data?.data?.tutors ?? [];
    // console.log(tutors);

    const pagination = data?.data?.meta || {
        limit: 10,
        page: 1,
        totalPage: 0,
        total: 0,
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 md:py-12 space-y-8">
                {/* ── Header Section ── */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Find your perfect tutor
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Expert educators ready to guide you —{" "}
                            {pagination.total} options available.
                        </p>
                    </div>

                    {/* Controls Bar */}
                    <div className="flex gap-3 items-center">
                        <div className="flex-1">
                            <SearchBox placeholder="Search by name or subject…" />
                        </div>
                        <div className="md:hidden">
                            <FilterSheet />
                        </div>
                    </div>
                </header>

                <Separator className="bg-border/60" />

                {/* ── Search & Mobile Filter Trigger ── */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="md:hidden w-full sm:w-auto">
                        <FilterSheet />
                    </div>
                </div>

                {/* ── Main Content Layout ── */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <aside className="hidden md:block sticky top-24 shrink-0">
                        <TutorFilters />
                    </aside>

                    <main className="flex-1 w-full space-y-8">
                        {tutors.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4 md:px-0">
                                    {tutors.map((tutor: any) => (
                                        <TutorCard
                                            key={tutor.id}
                                            tutor={tutor}
                                        />
                                    ))}
                                </div>
                                <div className="pt-4 border-t">
                                    <PaginationController meta={pagination} />
                                </div>
                            </>
                        ) : (
                            <div className="flex w-full flex-col items-center justify-center py-24 rounded-3xl border-2 border-dashed border-border bg-muted/10 gap-5 text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                                    <BookOpen className="h-8 w-8 text-muted-foreground/60" />
                                </div>
                                <div className="max-w-sm px-4">
                                    <h3 className="text-xl font-bold text-foreground">
                                        No tutors match your criteria
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Try adjusting your filters or search
                                        terms.
                                    </p>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
