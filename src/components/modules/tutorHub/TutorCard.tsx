import Link from "next/link";
import { Star, MessageCircle, BookOpen, ChevronRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function TutorCard({ tutor }: { tutor: any }) {
    return (
        <Card className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50 p-0 h-full">
            {/* ── Profile section: no dark banner, just clean card top ── */}
            <CardContent className="flex flex-col flex-1 gap-4 p-5">
                {/* Top row: avatar + price */}
                <div className="flex items-start justify-between gap-3">
                    <div className="relative shrink-0">
                        <Avatar className="h-14 w-14 rounded-2xl border-2 border-border shadow-sm">
                            <AvatarImage
                                src={tutor.user.image}
                                alt={tutor.user.name}
                                className="object-cover"
                            />
                            <AvatarFallback className="rounded-2xl bg-primary/10 text-primary font-semibold text-xl">
                                {tutor.user.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        {/* Online dot — always visible, no z-index clash */}
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-card" />
                    </div>

                    <Badge
                        variant="secondary"
                        className="mt-0.5 shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary border-primary/20 hover:bg-primary/10"
                    >
                        ৳{tutor.hourlyRate}/hr
                    </Badge>
                </div>

                {/* Name + experience */}
                <div className="space-y-1">
                    <h3 className="text-base font-semibold leading-tight text-foreground">
                        {tutor.user.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BookOpen className="h-3 w-3 text-primary shrink-0" />
                        <span>
                            {tutor.experienceYears > 0
                                ? `${tutor.experienceYears}+ yrs experience`
                                : "Expert Tutor"}
                        </span>
                    </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {tutor.bio}
                </p>

                {/* Subject tags */}
                <div className="flex flex-wrap gap-1.5">
                    {tutor.subjects?.slice(0, 3).map((sub: string) => (
                        <Badge
                            key={sub}
                            variant="outline"
                            className="text-[10px] px-2 py-0.5 rounded-md tracking-wide font-medium"
                        >
                            {sub}
                        </Badge>
                    ))}
                    {tutor.subjects?.length > 3 && (
                        <Badge
                            variant="outline"
                            className="text-[10px] px-2 py-0.5 rounded-md text-muted-foreground"
                        >
                            +{tutor.subjects.length - 3}
                        </Badge>
                    )}
                </div>

                {/* Rating row */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{tutor.averageRating ?? "—"}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {tutor.totalReviews ?? 0} reviews
                    </span>
                </div>
            </CardContent>

            <Separator />

            {/* Footer */}
            <CardFooter className="p-3 flex gap-2">
                <Button
                    asChild
                    size="sm"
                    className="flex-1 rounded-xl h-9 font-medium text-xs gap-1.5"
                >
                    <Link href={`/tutors/${tutor.id}`}>
                        View Profile
                        <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-xl shrink-0"
                    title="Message tutor"
                >
                    <MessageCircle className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
