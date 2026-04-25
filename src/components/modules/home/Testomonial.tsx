import * as React from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { reviewService } from "@/service/review.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define the type based on your JSON format
interface Review {
    id: string;
    rating: number;
    comment: string;
    student: {
        name: string;
        image: string;
    };
    tutor: {
        id: string;
        user: {
            name: string;
        };
    };
}

const TestimonialCarousel = async () => {
    // Fetching real data
    const response = await reviewService.getReviews();
    const reviews: Review[] = response?.data || [];

    return (
        <section className="w-full pb-16 md:py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="flex flex-col items-start justify-between gap-6 border-l-4 border-primary pl-6 md:flex-row md:items-center">
                        <div className="space-y-2">
                            <h2 className="text-lg lg:text-4xl font-black tracking-tighter text-foreground sm:text-5xl uppercase">
                                Trusted by{" "}
                                <span className="text-primary/60">
                                    Global Learners
                                </span>
                            </h2>
                            <p className="text-muted-foreground text-sm md:font-medium">
                                Real feedback from students who mastered new
                                skills.
                            </p>
                        </div>
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
                        {reviews.map((review) => (
                            <CarouselItem
                                key={review.id}
                                className="pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="h-full p-1">
                                    <Card className="h-full border-primary/5 bg-card/50 backdrop-blur-sm rounded-[2rem] transition-all duration-300 hover:border-primary/20">
                                        <CardContent className="flex flex-col p-8 justify-between h-full">
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-0.5">
                                                        {/* Dynamic Rating Stars */}
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${
                                                                        i <
                                                                        review.rating
                                                                            ? "fill-primary text-primary"
                                                                            : "fill-muted text-muted"
                                                                    }`}
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                    <Quote className="h-8 w-8 text-primary/10" />
                                                </div>

                                                <p className="text-lg font-medium leading-relaxed text-foreground/90 italic">
                                                    "{review.comment}"
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 pt-8 mt-auto">
                                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/10">
                                                    <img
                                                        src={
                                                            review.student
                                                                .image ||
                                                            "https://github.com/shadcn.png"
                                                        }
                                                        alt={
                                                            review.student.name
                                                        }
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h4 className="font-bold text-foreground truncate">
                                                        {review.student.name}
                                                    </h4>
                                                    <Link
                                                        href={`/tutors/${review.tutor.id}`}
                                                        className="text-xs text-muted-foreground truncate uppercase tracking-wider"
                                                    >
                                                        Student of{" "}
                                                        <Button
                                                            variant="outline"
                                                            className="cursor-pointer"
                                                        >
                                                            {
                                                                review.tutor
                                                                    .user.name
                                                            }{" "}
                                                            sir
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation controls */}
                    <div className="flex justify-center gap-4 mt-10 md:absolute md:-top-20 md:right-0 md:mt-0">
                        <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border-primary/10 hover:bg-primary hover:text-white transition-colors" />
                        <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border-primary/10 hover:bg-primary hover:text-white transition-colors" />
                    </div>
                </Carousel>

                {reviews.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        No reviews yet. Be the first to leave one!
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestimonialCarousel;
