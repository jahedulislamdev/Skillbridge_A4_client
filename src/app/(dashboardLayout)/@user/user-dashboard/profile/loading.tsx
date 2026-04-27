import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfileLoading() {
    return (
        <div className="container max-w-4xl py-6 md:py-10">
            <Card className="mx-auto w-full max-w-3xl border-none shadow-none sm:border sm:shadow-sm">
                <CardHeader className="space-y-2 px-4 sm:px-6">
                    {/* Title and Description Skeleton */}
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-72" />
                </CardHeader>

                <div className="px-4 sm:px-6">
                    <Separator className="mb-6" />

                    <div className="space-y-8 pb-6">
                        {/* Avatar/Profile Image Skeleton */}
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-4 w-24" /> {/* Label */}
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-20 w-20 rounded-full" />{" "}
                                {/* Image circle */}
                                <Skeleton className="h-9 w-32" />{" "}
                                {/* Upload button */}
                            </div>
                        </div>

                        {/* Form Fields Skeletons */}
                        <div className="grid gap-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>

                            {/* Bio/Additional Field */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-24 w-full" />
                            </div>
                        </div>

                        {/* Action Button Skeleton */}
                        <div className="flex justify-start">
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
