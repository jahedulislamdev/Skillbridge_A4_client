import { tutorService } from "@/service/tutor.service";
import { Search, BookOpen, Users, Layers, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PaginationController } from "@/components/layout/Pagination";
import { TutorCard } from "@/components/modules/tutorHub/TutorCard";
import { StatPill } from "@/components/modules/tutorHub/StatPills";
import TutorSearch from "@/components/modules/tutorHub/TutorSearch";

export default async function TutorHub({
    searchParams,
}: {
    searchParams: Promise<{
        search: string;
        page: string;
        limit: string;
        rating: number;
    }>;
}) {
    const { limit, page, rating, search } = await searchParams;
    const { data } = await tutorService.getTutors({
        limit,
        search,
        page,
        rating,
    });

    const tutors: any[] = data?.data?.tutors ?? [];
    // console.log(data?.data.meta);

    const pagination = data?.data?.meta || {
        limit: 10,
        page: 1,
        totalPage: 0,
        total: 0,
    };

    const totalSubjects = 0;
    const avgRating = 0;

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14 space-y-8">
                {/* ── Header ── */}
                <header className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-widest text-primary font-medium">
                            Learning Platform
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Find your{" "}
                            <span className="text-blue-500 ">perfect</span>{" "}
                            tutor
                        </h1>
                        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                            Expert educators ready to guide you — from
                            foundational skills to advanced mastery.
                        </p>
                    </div>

                    {/* Search + stats */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
                        {/* <form className="relative w-full sm:max-w-sm">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            <Input
                                name="query"
                                placeholder="Search by name or subject…"
                                className="pl-10 h-10 rounded-xl bg-card"
                            />
                        </form> */}
                        <TutorSearch />
                        {/* ──render satate pills── */}
                        {tutors.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <StatPill
                                    icon={Users}
                                    value={tutors.length}
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
                                    label="Avg Rating"
                                />
                            </div>
                        )}
                    </div>
                </header>

                <Separator />

                {/* ── Grid ── */}
                {tutors.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
                            {tutors.map((tutor: any) => (
                                <TutorCard key={tutor.id} tutor={tutor} />
                            ))}
                        </div>
                        <PaginationController meta={pagination} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 rounded-2xl border border-dashed border-border bg-muted/20 gap-4 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">
                                No tutors found
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Try adjusting your search — more educators join
                                every week.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
