import Link from "next/link";
import {
    Star,
    MessageCircle,
    BookOpen,
    ChevronRight,
    CheckCircle2,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { TutorStatus } from "@/constants/tutorStatus";

export function TutorCard({ tutor }: { tutor: any }) {
    const displaySubjects = tutor.tutorSubjects?.slice(0, 3) || [];
    const remainingCount = (tutor.tutorSubjects?.length || 0) - 3;

    return (
        <Card className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:border-primary/40 p-0 h-full">
            <CardContent className="flex flex-col flex-1 gap-4 p-5">
                {/* Top row: Avatar & Price */}
                <div className="flex items-start justify-between gap-3">
                    <div className="relative shrink-0">
                        <Avatar className="h-14 w-14 rounded-2xl border-2 border-background shadow-sm ring-1 ring-border">
                            <AvatarImage
                                src={tutor.user.image}
                                alt={tutor.user.name}
                                className="object-cover"
                            />
                            <AvatarFallback className="rounded-2xl bg-primary/5 text-primary font-bold text-xl">
                                {tutor.user.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        {/* Verified Badge: Top-Right corner */}
                        {tutor.status === TutorStatus.APPROVED && (
                            <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5 shadow-sm">
                                <CheckCircle2 className="h-4 w-4 fill-blue-500 text-white" />
                            </div>
                        )}

                        {/* Online Status Dot: Bottom-Right corner */}
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-background shadow-sm" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <Badge className="rounded-lg px-2.5 py-1 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                            ৳{tutor.hourlyRate}/hr
                        </Badge>
                    </div>
                </div>

                {/* Name & Experience */}
                <div className="space-y-1.5">
                    <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {tutor.user.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5 text-primary/70" />
                        <span>
                            {tutor.experienceYears > 0
                                ? `${tutor.experienceYears}+ Years Experience`
                                : "Certified Tutor"}
                        </span>
                    </div>
                </div>

                {/* --- Subject Section: Improved UI --- */}
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                        {displaySubjects.map((ts: any) => (
                            <Badge
                                key={ts.subjects.id}
                                variant="secondary"
                                className="bg-secondary/50 text-secondary-foreground hover:bg-secondary border-none px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            >
                                {ts.subjects.name}
                            </Badge>
                        ))}
                        {remainingCount > 0 && (
                            <Badge
                                variant="outline"
                                className="text-[10px] px-2 py-0.5 border-dashed border-muted-foreground/30 text-muted-foreground"
                            >
                                +{remainingCount} More
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic">
                    "{tutor.bio}"
                </p>

                {/* Rating & Reviews */}
                <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-md">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-500">
                            {tutor.averageRating ?? "New"}
                        </span>
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">
                        {tutor.totalReviews ?? 0} Reviews
                    </span>
                </div>
            </CardContent>

            <Separator className="opacity-50" />

            {/* Footer Actions */}
            <CardFooter className="p-3 bg-muted/20 flex gap-2">
                <Button
                    asChild
                    size="sm"
                    className="flex-1 rounded-xl h-10 font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                    <Link
                        href={`/tutors/${tutor.id}`}
                        className="flex items-center justify-center gap-2"
                    >
                        View Profile
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl shrink-0 border-border bg-background hover:bg-primary/5 hover:text-primary transition-colors"
                >
                    <MessageCircle className="h-4.5 w-4.5" />
                </Button>
            </CardFooter>
        </Card>
    );
}
