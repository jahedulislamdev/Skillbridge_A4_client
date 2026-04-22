"use client";

import Image from "next/image";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import { RegisterForm } from "@/components/modules/authentication/register-form";
import registerImage from "../../../../public/Fatherhood.svg";

export default function RegisterPage() {
    return (
        <div className="grid md:min-h-screen grid-cols-1 lg:grid-cols-2 bg-background">
            {/* LEFT SIDE: Visual/Vector Section (Visible only on LG devices) */}
            <div className="relative hidden lg:flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 p-12 overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-lg text-center space-y-8">
                    {/* The Vector Image */}
                    <div className="relative w-full aspect-square max-w-112.5 mx-auto drop-shadow-2xl animate-in fade-in zoom-in duration-700">
                        <Image
                            src={registerImage}
                            alt="Welcome Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Branding/Text */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-black tracking-tight text-foreground">
                            Shape Your Future <br />
                            <span className="text-primary">
                                With Expert Guidance.
                            </span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Join over 5,000+ students already learning from the
                            best tutors worldwide.
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Register Form */}
            <div className="flex items-center justify-center p-6 sm:p-12 lg:p-20 relative">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex gap-2 place-content-center font-bold text-xl bg-card/20 backdrop-blur-md mx-7 py-2 rounded-lg lg:hidden">
                        <GraduationCap className="w-6 h-6 " />{" "}
                        <p className="">SKILLBRIDGE</p>
                    </div>

                    {/* The RegisterForm component we created earlier */}
                    <RegisterForm className="border-none shadow-none lg:shadow-none lg:border-none" />
                </div>
            </div>
        </div>
    );
}
