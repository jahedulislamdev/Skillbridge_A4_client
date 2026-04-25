import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import onlineLearning from "../../../../public/online_learning.svg";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-6 sm:pt-10 pb-12 md:pt-4">
            {/* Background Ambient Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-primary/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-100 h-100 bg-purple-500/10 blur-[100px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* LEFT CONTENT */}
                    <div className="relative z-10 space-y-8 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Star className="w-4 h-4 fill-primary" />
                            <span>
                                The #1 Platform for Specialized Learning
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl xl:text-7xl">
                            Master Skills with{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                                    Expert Mentors
                                </span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full h-3 text-primary/20"
                                    viewBox="0 0 100 10"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0 5 Q 25 0 50 5 T 100 5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                </svg>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Personalized 1-on-1 sessions designed to simplify
                            complex topics and accelerate your professional or
                            academic growth.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="h-14 px-10 text-base font-semibold rounded-full shadow-xl shadow-primary/25 transition-all hover:scale-105 active:scale-95"
                            >
                                <Link href="/sessions">Book a Session</Link>
                            </Button>

                            <Button
                                asChild
                                size="lg"
                                variant="ghost"
                                className="group h-14 px-8 text-base font-medium rounded-full hover:bg-primary/5"
                            >
                                <Link
                                    href="/tutors"
                                    className="flex items-center"
                                >
                                    Explore Tutors
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        {/* Trust Features */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span>Verified Tutors</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span>Risk-free Trial</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT - VISUALS */}
                    <div className="relative lg:ml-auto group">
                        {/* Floating Decorative Cards */}
                        <div className="absolute -top-6 -left-6 z-20 bg-card p-4 rounded-2xl shadow-2xl border border-border animate-bounce-slow hidden sm:block">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle2 className="text-emerald-600 w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Completed
                                    </p>
                                    <p className="text-sm font-bold">
                                        12k+ Lessons
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* <div className="absolute bottom-10 -right-6 z-20 bg-card p-4 rounded-2xl shadow-2xl border border-border   hidden sm:block">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <Avatar
                                            key={i}
                                            className="w-8 h-8 rounded-full border-2 border-card bg-muted"
                                        ></Avatar>
                                    ))}
                                </div>
                                <p className="text-sm font-bold">
                                    4.9/5 Rating
                                </p>
                            </div>
                        </div> */}

                        {/* Main Image Container */}
                        <div className="relative aspect-square w-full max-w-[500px] mx-auto lg:max-w-none">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:scale-105 transition-transform duration-700" />
                            <div className="relative h-full w-full bg-card/40 backdrop-blur-[2px] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                                {" "}
                                <Image
                                    src={onlineLearning}
                                    alt="Online learning"
                                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105 bounce"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
