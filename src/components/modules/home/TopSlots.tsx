import { slotService } from "@/service/slots.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Clock,
    CalendarDays,
    GraduationCap,
    BookOpen,
    Banknote,
    ArrowRight,
} from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import {
    calculateSlotMetrics,
    dayMap,
    formatTime,
} from "@/helper/slots.helper";

const TopSlots = async () => {
    const { data } = await slotService.getSlots(
        { limit: "6" },
        { revalidate: 60 },
    );
    const slots = data?.data.slots || [];

    if (slots.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            {/* Shared Carousel Context */}
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="w-full"
            >
                {/* Custom Border-Accented Header Area */}
                <div className="mb-16 flex flex-col items-start justify-between gap-6 border-l-4 border-primary pl-6 md:flex-row md:items-center">
                    <div className="space-y-2">
                        <h2 className="text-lg md:text-xl lg:text-4xl font-black tracking-tighter text-foreground sm:text-5xl uppercase">
                            Top <span className="text-primary/60">Slots</span>
                        </h2>
                        <p className="text-muted-foreground text-sm md:font-medium">
                            Explore our most popular tutoring slots available
                            today.
                        </p>
                    </div>

                    {/* Action Row: Keeps 'See All' and desktop arrows safely aligned */}
                    <div className="flex items-center gap-4 self-start md:self-auto">
                        <Button
                            asChild
                            variant="ghost"
                            className="group font-semibold text-primary gap-1"
                        >
                            <Link href="/sessions">
                                See All Slots
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>

                        {/* Desktop Navigation Arrows */}
                        <div className="hidden sm:flex items-center gap-2">
                            <CarouselPrevious className="static translate-y-0" />
                            <CarouselNext className="static translate-y-0" />
                        </div>
                    </div>
                </div>

                {/* Carousel Grid Items */}
                <CarouselContent className="-ml-4">
                    {slots.map((slot: any) => {
                        const { duration, totalPrice } = calculateSlotMetrics(
                            slot.startTime,
                            slot.endTime,
                            slot.tutor.hourlyRate,
                        );

                        return (
                            <CarouselItem
                                key={slot.id}
                                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                            >
                                <Link
                                    href={`/tutors/${slot.tutor.id}`}
                                    className="group relative flex flex-col h-full border rounded-2xl bg-card overflow-hidden transition-all hover:shadow-xl hover:border-primary/20 p-5 space-y-4"
                                >
                                    {/* Tutor Header Info */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                                <AvatarImage
                                                    src={slot.tutor.user.image}
                                                />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {slot.tutor.user
                                                        .name?.[0] || "T"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-bold text-foreground leading-none group-hover:text-primary transition-colors">
                                                    {slot.tutor.user.name}
                                                </h3>
                                                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                                    <GraduationCap className="w-3 h-3" />
                                                    <span>
                                                        {slot.tutor
                                                            .experienceYears ||
                                                            "Entry"}{" "}
                                                        yrs exp.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="font-bold text-primary whitespace-nowrap"
                                        >
                                            ৳{slot.tutor.hourlyRate}/hr
                                        </Badge>
                                    </div>

                                    {/* Subject Badges */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {slot.tutor.tutorSubjects?.length >
                                        0 ? (
                                            slot.tutor.tutorSubjects.map(
                                                (sub: any, i: number) => (
                                                    <Badge
                                                        key={i}
                                                        variant="outline"
                                                        className="text-[10px] uppercase font-bold tracking-wider py-0 px-2 bg-primary/5"
                                                    >
                                                        {sub.subjects.name}
                                                    </Badge>
                                                ),
                                            )
                                        ) : (
                                            <span className="text-[11px] text-muted-foreground italic flex items-center gap-1">
                                                <BookOpen className="w-3 h-3" />{" "}
                                                General Mentorship
                                            </span>
                                        )}
                                    </div>

                                    {/* Slot Parameters Details */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-transparent group-hover:border-muted/60 transition-colors">
                                            <CalendarDays className="w-4 h-4 text-primary" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                                                    Day
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {dayMap[slot.dayOfWeek]}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-transparent group-hover:border-muted/60 transition-colors">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                                                    Duration
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {duration} Hours
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer Breakdown */}
                                    <div className="flex items-center justify-between text-xs sm:text-sm px-1 pt-2 border-t mt-auto">
                                        <span className="text-muted-foreground font-medium">
                                            {formatTime(slot.startTime)} -{" "}
                                            {formatTime(slot.endTime)}
                                        </span>
                                        <div className="flex items-center gap-1 font-bold text-foreground whitespace-nowrap">
                                            <Banknote className="w-4 h-4 text-emerald-500" />
                                            <span>Total: ৳{totalPrice}</span>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {/* Mobile Navigation Controls */}
                <div className="flex justify-center gap-2 mt-6 sm:hidden">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                </div>
            </Carousel>
        </div>
    );
};

export default TopSlots;
