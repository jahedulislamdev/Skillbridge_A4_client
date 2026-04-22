import { tutorService } from "@/service/tutor.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Briefcase, ShieldCheck, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import StickySidebar from "@/components/modules/tutorDetails/StickySidebar";
import TutorDetailsTabs from "@/components/modules/tutorDetails/TutorDetailsTabs";

const TutorDetails = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const { data } = await tutorService.getTutorById(id);
    const tutor = data.data;
    console.log(tutor);
    console.log(tutor.reviews);

    if (!tutor) {
        return (
            <div className="flex flex-col h-[60vh] items-center justify-center gap-4 text-center">
                <p className="text-muted-foreground text-lg">
                    Tutor profile not found.
                </p>
                <Button asChild variant="outline">
                    <Link href="/tutors">Return to Directory</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Top Navigation Bar */}
            <div className="border-b bg-card/50 rounded-xl backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        asChild
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <Link href="/tutors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Tutors
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Share2 size="7" />
                    </Button>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Content (8 cols) */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Profile Hero Section */}
                        <section className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative">
                                <Avatar className="h-32 w-32 md:h-44 md:w-44 border-4 border-background shadow-2xl ring-1 ring-border">
                                    <AvatarImage
                                        src={tutor.user.image}
                                        alt={tutor.user.name}
                                    />
                                    <AvatarFallback className="text-4xl">
                                        {tutor.user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 pt-2">
                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-4xl font-extrabold tracking-tight">
                                            {tutor.user.name}
                                        </h1>
                                        <Badge
                                            variant="outline"
                                            className="bg-primary/5 text-primary border-primary/20 font-semibold px-3 py-1"
                                        >
                                            {tutor.status === "APPROVED"
                                                ? "Top Rated"
                                                : "Pro Tutor"}
                                        </Badge>
                                    </div>
                                    <p className="text-xl text-muted-foreground">
                                        Expert in Academic Excellence
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-2" />
                                        <span className="font-bold text-lg">
                                            {tutor.averageRating.toFixed(1)}
                                        </span>
                                        <span className="ml-1.5 text-muted-foreground font-medium">
                                            ({tutor.totalReviews} verified
                                            reviews)
                                        </span>
                                    </div>
                                    <div className="flex items-center text-muted-foreground font-medium">
                                        <Briefcase className="w-5 h-5 mr-2 opacity-70" />
                                        {tutor.experienceYears}+ Years
                                        Experience
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Separator />

                        {/* Tabs for Info, Reviews, and Availability */}
                        <TutorDetailsTabs tutor={tutor} />
                    </div>

                    {/* Right Column: Sticky Booking Sidebar (4 cols) */}
                    <StickySidebar tutor={tutor} />
                </div>
            </main>
        </div>
    );
};

export default TutorDetails;
