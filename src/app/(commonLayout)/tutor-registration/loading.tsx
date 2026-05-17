"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TutorRegisterSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-lg shadow-sm">
                {/* ── Header Skeleton ── */}
                <CardHeader className="pb-0 pt-6 px-6">
                    <div className="flex items-center gap-3">
                        {/* User Icon Circle */}
                        <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                        <div className="space-y-2 flex-1">
                            {/* Title */}
                            <Skeleton className="h-5 w-1/3" />
                            {/* Subtitle */}
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                    <div className="mt-5 h-px bg-border" />
                </CardHeader>

                {/* ── Form Content Skeleton ── */}
                <CardContent className="px-6 pt-5 pb-6 space-y-5">
                    {/* BIO FIELD */}
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-12" /> {/* Label */}
                        <Skeleton className="h-20 w-full rounded-md" />{" "}
                        {/* Textarea */}
                    </div>

                    {/* RATE + EXPERIENCE GRID */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Hourly Rate */}
                        <div className="space-y-1.5">
                            <Skeleton className="h-4 w-20" /> {/* Label */}
                            <Skeleton className="h-10 w-full rounded-md" />{" "}
                            {/* Input */}
                            <Skeleton className="h-3 w-24" /> {/* Help text */}
                        </div>
                        {/* Experience */}
                        <div className="space-y-1.5">
                            <Skeleton className="h-4 w-20" /> {/* Label */}
                            <Skeleton className="h-10 w-full rounded-md" />{" "}
                            {/* Input */}
                            <Skeleton className="h-3 w-28" /> {/* Help text */}
                        </div>
                    </div>

                    {/* SUBJECTS FIELD */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-32" /> {/* Label */}
                        </div>
                        {/* Pill Buttons Container */}
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-8 w-16 rounded-full" />
                            <Skeleton className="h-8 w-24 rounded-full" />
                            <Skeleton className="h-8 w-20 rounded-full" />
                            <Skeleton className="h-8 w-28 rounded-full" />
                            <Skeleton className="h-8 w-16 rounded-full" />
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-1 space-y-3">
                        <Skeleton className="h-10 w-full rounded-md" />{" "}
                        {/* Button */}
                        <div className="flex justify-center">
                            <Skeleton className="h-3 w-3/4" />{" "}
                            {/* Footer disclaimer */}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
