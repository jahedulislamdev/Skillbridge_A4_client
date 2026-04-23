import * as React from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
    {
        name: "Alex Rivers",
        role: "UX Designer",
        content:
            "The 1-on-1 sessions transformed my workflow. Having an expert look at my actual project files was the breakthrough I needed.",
        avatar: "https://i.pravatar.cc/150?u=alex",
    },
    {
        name: "Sarah Chen",
        role: "Software Engineer",
        content:
            "SkillBridge didn't just teach me syntax; it taught me how to think like a Senior Dev. Highly recommended.",
        avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
        name: "Marcus Thorne",
        role: "Fashion Student",
        content:
            "The Sewing and Tailoring mentorship is world-class. My technical skills improved more in 2 weeks than in a year of self-study.",
        avatar: "https://i.pravatar.cc/150?u=marcus",
    },
    {
        name: "Elena Rodriguez",
        role: "Marketing Head",
        content:
            "Finding high-level French tutoring that fits a busy executive schedule was impossible until I found this platform.",
        avatar: "https://i.pravatar.cc/150?u=elena",
    },
];

const TestimonialCarousel = () => {
    return (
        <section className="w-full pb-16 md:py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="mb-16 flex flex-col items-end justify-between gap-6 border-l-4 border-primary pl-6 md:flex-row md:items-center">
                        <div className="space-y-2">
                            <h2 className="text-lg lg:text-4xl font-black tracking-tighter text-foreground sm:text-5xl uppercase">
                                Trusted by{" "}
                                <span className="text-primary/60">
                                    Global Learners
                                </span>
                            </h2>
                            <p className="text-muted-foreground text-sm md:font-medium">
                                Choose your path. Targeted learning with top
                                Instractors.
                            </p>
                        </div>
                    </div>
                    {/* Hidden on mobile, shown on desktop for better control spacing */}
                    <div className="hidden md:flex gap-2">
                        <div
                            id="carousel-controls"
                            className="relative h-12 w-24"
                        />
                    </div>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {testimonials.map((review, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="h-full p-1">
                                    <Card className="h-full border-primary/5 bg-card/50 backdrop-blur-sm rounded-[2rem] transition-all duration-300 hover:border-primary/20">
                                        <CardContent className="flex flex-col p-8 justify-between h-full">
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="h-4 w-4 fill-primary text-primary"
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                    <Quote className="h-8 w-8 text-primary/10" />
                                                </div>

                                                <p className="text-lg font-medium leading-relaxed text-foreground/90">
                                                    "{review.content}"
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 pt-8 mt-auto">
                                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/10">
                                                    {/* <Image
                                                        src={review.avatar}
                                                        alt={review.name}
                                                        fill
                                                        className="object-cover"
                                                    /> */}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h4 className="font-bold text-foreground truncate">
                                                        {review.name}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {review.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Custom positioned buttons for better Mobile UX */}
                    <div className="flex justify-center gap-4 mt-10 md:absolute md:-top-20 md:right-0 md:mt-0">
                        <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border-primary/10 hover:bg-primary hover:text-white" />
                        <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border-primary/10 hover:bg-primary hover:text-white" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};

export default TestimonialCarousel;
