"use client";

import Image from "next/image";
import { LoginForm } from "@/components/modules/authentication/login-form";
import { GraduationCap, Sparkles } from "lucide-react";
import loginImage from "../../../../public/kids_stading.svg";

export default function LoginPage() {
    return (
        <div className="grid md:min-h-screen grid-cols-1 lg:grid-cols-2 bg-background">
            {/* LEFT SIDE: Login Specific Visual Section (Hidden on Mobile) */}
            <div className="relative hidden lg:flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 p-12 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[5%] left-[-5%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-lg text-center space-y-8">
                    {/* Your Vector Image */}
                    <div className="relative w-full aspect-square max-w-105 mx-auto drop-shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        <Image
                            src={loginImage}
                            alt="Login Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Marketing Text */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                            <Sparkles className="w-4 h-4" />
                            <span>Welcome Back!</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-foreground">
                            Ready to continue your <br />
                            <span className="text-primary">
                                Learning Journey?
                            </span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Log in to access your dashboard, track your
                            progress, and connect with your tutors.
                        </p>
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="absolute bottom-8 text-center w-full">
                    <p className="text-xs text-muted-foreground/60 font-medium tracking-widest">
                        SKILLBRIDGE • EST. 2026
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Login Form Section */}
            <div className="flex items-center justify-center p-6 sm:p-12 lg:p-20 relative">
                <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    {/* Your LoginForm Component */}
                    <div className="flex gap-2 place-content-center font-bold text-xl bg-card/20 backdrop-blur-md mx-7 py-2 rounded-lg lg:hidden">
                        <GraduationCap className="w-6 h-6 " />{" "}
                        <p className="">SKILLBRIDGE</p>
                    </div>
                    <LoginForm className="border-none shadow-none lg:shadow-none lg:border-none p-0" />
                </div>
            </div>
        </div>
    );
}
