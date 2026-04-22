import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calendar,
    Clock,
    GraduationCap,
    MessageSquare,
    Star,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AvailabilitySlot, Review, TutorDetail } from "@/types/tutorDetails";
const TutorDetailsTabs = ({ tutor }: { tutor: TutorDetail }) => {
    return (
        <Tabs defaultValue="about" className="w-full">
            <TabsList className="  w-full justify-start h-12 bg-transparent border-b rounded-none p-0 gap-8">
                <TabsTrigger value="about" className="tab-trigger">
                    Biography
                </TabsTrigger>
                <TabsTrigger value="slots" className="tab-trigger">
                    Availability
                </TabsTrigger>
                <TabsTrigger value="reviews" className="tab-trigger">
                    Reviews
                </TabsTrigger>
            </TabsList>

            {/* Biography Content */}
            <TabsContent
                value="about"
                className="pt-8 space-y-8 animate-in fade-in slide-in-from-bottom-2"
            >
                <div className="prose prose-slate max-w-none dark:prose-invert">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {tutor.bio ||
                            "This educator is dedicated to providing high-quality, personalized learning experiences designed to help students achieve their full potential."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-muted/30 border-none">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 rounded-full bg-background shadow-sm text-primary">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold">Education</h4>
                                <p className="text-sm text-muted-foreground italic">
                                    Verified Degree Holder
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/30 border-none">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 rounded-full bg-background shadow-sm text-primary">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold">Fast Response</h4>
                                <p className="text-sm text-muted-foreground italic">
                                    Replies within 1 hour
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            {/* Availability Content */}
            <TabsContent value="slots" className="pt-8 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {tutor.availabilitySlots?.map(
                        (slot: AvailabilitySlot, idx: number) => (
                            <Card
                                key={idx}
                                className="hover:border-primary/50 transition-colors cursor-pointer group"
                            >
                                <CardContent className="p-4 flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm uppercase tracking-tighter">
                                            {new Date(
                                                slot.startTime,
                                            ).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <span className="text-lg font-medium tracking-tight">
                                        {new Date(
                                            slot.startTime,
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </CardContent>
                            </Card>
                        ),
                    )}
                    {(!tutor.availabilitySlots ||
                        tutor.availabilitySlots.length === 0) && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl">
                            <p className="text-muted-foreground">
                                No slots currently available.
                            </p>
                        </div>
                    )}
                </div>
            </TabsContent>

            {/* Reviews Content */}
            <TabsContent
                value="reviews"
                className="pt-8 space-y-10 animate-in fade-in duration-500"
            >
                {/* Overall Rating Summary Card */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl bg-muted/30 border border-border/50">
                    <div className="text-center sm:text-left">
                        <h3 className="text-6xl font-black tracking-tighter text-foreground">
                            {tutor.averageRating.toFixed(1)}
                        </h3>
                        <div className="flex justify-center sm:justify-start text-yellow-500 my-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(tutor.averageRating) ? "fill-current" : "text-muted"}`}
                                />
                            ))}
                        </div>
                        <p className="text-xs uppercase font-bold tracking-[0.2em] text-muted-foreground">
                            Out of {tutor.totalReviews} Reviews
                        </p>
                    </div>

                    <Separator
                        orientation="vertical"
                        className="hidden sm:block h-20 bg-border/50"
                    />

                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                            98% of students recommended this tutor for their
                            clarity and expertise in the subject matter.
                        </p>
                    </div>
                </div>

                {/* Individual Reviews List */}
                <div className="grid gap-8">
                    {tutor.reviews?.map((r: Review) => (
                        <div
                            key={r.id}
                            className="group relative flex flex-col gap-4 p-2 transition-all"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm">
                                        <AvatarImage
                                            src={r.student.image}
                                            alt={r.student.name}
                                        />
                                        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                            {r.student.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-sm text-foreground">
                                            {r.student.name}
                                        </p>
                                        <div className="flex text-yellow-500 scale-75 -ml-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < r.rating ? "fill-current" : "text-muted"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <Badge
                                        variant="secondary"
                                        className="text-[10px] font-bold uppercase tracking-tight bg-emerald-500/10 text-emerald-600 border-none"
                                    >
                                        Verified Session
                                    </Badge>
                                    <p className="text-[10px] text-muted-foreground mt-1">
                                        {new Date(
                                            r.booking.scheduledAt,
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="relative pl-4 border-l-2 border-primary/10">
                                <p className="text-muted-foreground text-md leading-relaxed italic">
                                    &ldquo;{r.comment}&rdquo;
                                </p>
                            </div>
                        </div>
                    ))}

                    {(!tutor.reviews || tutor.reviews.length === 0) && (
                        <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
                            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="text-muted-foreground">
                                No reviews yet. Be the first to study with{" "}
                                {tutor.user.name}!
                            </p>
                        </div>
                    )}
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default TutorDetailsTabs;
