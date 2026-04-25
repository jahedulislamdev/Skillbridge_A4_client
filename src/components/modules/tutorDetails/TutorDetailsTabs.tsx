import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calendar,
    Clock,
    GraduationCap,
    MessageSquare,
    Star,
    XCircle,
    ShoppingBag,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { AvailabilitySlot, Review, TutorDetail } from "@/types/tutorDetails";

const DAY_MAP: Record<string, string> = {
    SUN: "Sunday",
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
};

const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const TutorDetailsTabs = ({ tutor }: { tutor: TutorDetail }) => {
    return (
        <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none p-0 gap-8">
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
                            "This educator is dedicated to providing high-quality learning experiences."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-muted/30 border-none">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 rounded-full bg-background shadow-sm text-primary">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold">Experience</h4>
                                <p className="text-sm text-muted-foreground italic">
                                    {tutor.experienceYears} Years Professional
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
                                <h4 className="font-bold">Hourly Rate</h4>
                                <p className="text-sm text-muted-foreground italic">
                                    ৳{tutor.hourlyRate} / hour
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            {/* Availability Content */}
            <TabsContent value="slots" className="pt-8 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tutor.availabilitySlots?.map((slot: AvailabilitySlot) => (
                        <Card
                            key={slot.id}
                            className={`overflow-hidden transition-all ${slot.isBooked ? "opacity-70" : "hover:shadow-md"}`}
                        >
                            <CardContent className="p-0">
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <Badge
                                            variant="outline"
                                            className="bg-primary/5 text-primary border-primary/20"
                                        >
                                            {DAY_MAP[slot.dayOfWeek] ||
                                                slot.dayOfWeek}
                                        </Badge>
                                        {slot.isBooked && (
                                            <Badge
                                                variant="destructive"
                                                className="text-[10px]"
                                            >
                                                Occupied
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 font-semibold text-foreground">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <span>
                                            {formatTime(slot.startTime)} -{" "}
                                            {formatTime(slot.endTime)}
                                        </span>
                                    </div>
                                </div>

                                <div className="px-4 pb-4">
                                    {slot.isBooked ? (
                                        <Button
                                            disabled
                                            className="w-full bg-muted text-muted-foreground cursor-not-allowed"
                                        >
                                            <XCircle className="w-4 h-4 mr-2" />{" "}
                                            Already Booked
                                        </Button>
                                    ) : (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="w-full group">
                                                    <ShoppingBag className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                                                    Book Now
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Confirm Booking
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Review the session
                                                        details below.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <div className="mt-4 space-y-3 border rounded-lg p-4 bg-muted/30">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            Instructor
                                                        </span>
                                                        <span className="font-medium">
                                                            {tutor.user.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            Schedule
                                                        </span>
                                                        <span className="font-medium">
                                                            {
                                                                DAY_MAP[
                                                                    slot
                                                                        .dayOfWeek
                                                                ]
                                                            }
                                                            ,{" "}
                                                            {formatTime(
                                                                slot.startTime,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="border-t pt-2 flex justify-between items-center">
                                                        <span className="font-semibold">
                                                            Rate
                                                        </span>
                                                        <span className="text-lg font-bold text-primary">
                                                            ৳{tutor.hourlyRate}
                                                        </span>
                                                    </div>
                                                </div>

                                                <DialogFooter className="mt-6">
                                                    <DialogClose asChild>
                                                        <Button variant="ghost">
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>
                                                    <Button
                                                        onClick={() =>
                                                            console.log(
                                                                "Booking slot:",
                                                                slot.id,
                                                            )
                                                        }
                                                    >
                                                        Confirm & Schedule
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
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
                className="pt-8 space-y-10 animate-in fade-in"
            >
                <div className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl bg-muted/30 border border-border/50">
                    <div className="text-center sm:text-left">
                        <h3 className="text-6xl font-black tracking-tighter text-foreground">
                            {tutor.averageRating?.toFixed(1) || "0.0"}
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
                            Out of {tutor.reviews?.length || 0} Reviews
                        </p>
                    </div>
                    <Separator
                        orientation="vertical"
                        className="hidden sm:block h-20 bg-border/50"
                    />
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                            Average student rating based on verified teaching
                            sessions and content delivery.
                        </p>
                    </div>
                </div>

                <div className="grid gap-8">
                    {tutor.reviews?.map((r: Review) => (
                        <div
                            key={r.id}
                            className="group relative flex flex-col gap-4 p-2"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={r.student.image} />
                                        <AvatarFallback>
                                            {r.student.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-sm">
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
                                <Badge
                                    variant="secondary"
                                    className="text-[10px] bg-emerald-500/10 text-emerald-600 border-none"
                                >
                                    Verified Session
                                </Badge>
                            </div>
                            <div className="relative pl-4 border-l-2 border-primary/10">
                                <p className="text-muted-foreground text-md italic">
                                    &ldquo;{r.comment}&rdquo;
                                </p>
                            </div>
                        </div>
                    ))}
                    {(!tutor.reviews || tutor.reviews.length === 0) && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl">
                            <p className="text-muted-foreground">
                                No reviews available.
                            </p>
                        </div>
                    )}
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default TutorDetailsTabs;

/*{(!tutor.availabilitySlots ||
                        tutor.availabilitySlots.length === 0) && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl">
                            <p className="text-muted-foreground">
                                No slots currently available.
                            </p>
                        </div>
                    )} */
