import { tutorService } from "@/service/tutor.service";
import { BookOpen, Users, Layers, TrendingUp, Filter } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { PaginationController } from "@/components/layout/Pagination";
import { TutorCard } from "@/components/modules/tutorHub/TutorCard";
import { StatPill } from "@/components/modules/tutorHub/StatPills";
import TutorSearch from "@/components/modules/tutorHub/TutorSearch";
import { TutorFilters } from "@/components/modules/tutorHub/TutorFilter";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

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
    const pagination = data?.data?.meta || {
        limit: 10,
        page: 1,
        totalPage: 0,
        total: 0,
    };

    const totalSubjects = 0;
    const avgRating =
        tutors.length > 0
            ? tutors.reduce((sum, tutor) => sum + (tutor.avgRating || 0), 0) /
              tutors.length
            : 0;

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12 space-y-8">
                {/* ── Header Section ── */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-indigo-700 to-indigo-100 bg-clip-text text-transparent">
                            Find your perfect tutor
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-base max-w-prose leading-relaxed">
                            Expert educators ready to guide you — from
                            foundational skills to advanced mastery.
                        </p>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                        <StatPill
                            icon={Users}
                            value={pagination.total}
                            label="Tutors"
                        />
                        <StatPill
                            icon={Layers}
                            value={totalSubjects}
                            label="Subjects"
                        />
                        <StatPill
                            icon={TrendingUp}
                            value={avgRating}
                            label="Rating"
                        />
                    </div>
                </header>

                <Separator className="bg-border/60" />

                {/* ── Search & Mobile Filter Trigger ── */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-full sm:flex-1">
                        <TutorSearch />
                    </div>

                    <div className="md:hidden w-full sm:w-auto">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full gap-2 border-dashed"
                                >
                                    <Filter size={16} />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-[300px] p-0 overflow-y-auto"
                            >
                                <VisuallyHidden.Root>
                                    <SheetTitle>Tutor Filters</SheetTitle>
                                </VisuallyHidden.Root>

                                <TutorFilters className="border-0 shadow-none w-full" />
                            </SheetContent>
                        </Sheet>
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
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
