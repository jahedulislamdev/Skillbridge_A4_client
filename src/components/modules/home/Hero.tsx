import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import onlineLearning from "../../../../public/online_learning.svg";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden pt-10 md:pt-0 bg-background">
            {/* Glow Effects */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-125 w-125 bg-primary/20 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <div className="grid items-center md:gap-10 lg:grid-cols-2">
                    {/* LEFT */}
                    <div className="space-y-8">
                        {/* Heading */}
                        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl xl:text-6xl">
                            Master Skills with{" "}
                            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                Expert Mentors
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-xl text-lg text-muted-foreground">
                            Personalized 1-on-1 sessions designed to simplify
                            complex topics and accelerate your growth.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="h-14 px-8 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                            >
                                <Link href={"/sessions"}>Book Sessions</Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="group h-14 px-8 text-base font-medium"
                            >
                                <Link href={"/tutors"}>Explore Tutors</Link>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8 pt-4">
                            <div>
                                <p className="text-2xl font-bold">10K+</p>
                                <p className="text-sm text-muted-foreground">
                                    Students
                                </p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">500+</p>
                                <p className="text-sm text-muted-foreground">
                                    Tutors
                                </p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">4.9⭐</p>
                                <p className="text-sm text-muted-foreground">
                                    Rating
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative">
                        {/* Floating Glow */}
                        <div className="absolute -top-10 -right-10 h-72 w-72 bg-purple-300/20 blur-3xl rounded-full" />

                        <div className="relative aspect-4/5">
                            <Image
                                src={onlineLearning}
                                alt="Online learning"
                                fill
                                className="object-contain p-10"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
