import { Star, Briefcase, CheckCircle2, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TutorCard({ tutor }) {
    // Destructuring the data provided
    const {
        user,
        bio,
        averageRating,
        hourlyRate,
        experienceYears,
        status,
        availabilitySlots,
        totalReviews,
    } = tutor;

    return (
        <Card className="w-full max-w-md overflow-hidden hover:shadow-md transition-shadow border-slate-200">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                        <Avatar className="h-16 w-16 border">
                            <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                            />
                            <AvatarFallback>
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg">
                                    {user.name}
                                </h3>
                                {status === "APPROVED" && (
                                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                )}
                            </div>
                            <div className="flex items-center text-sm text-yellow-600 font-medium">
                                <Star className="w-4 h-4 fill-current mr-1" />
                                {averageRating.toFixed(1)}
                                <span className="text-muted-foreground ml-1 font-normal">
                                    ({totalReviews} reviews)
                                </span>
                            </div>
                        </div>
                    </div>
                    <Badge
                        variant={status === "PENDING" ? "outline" : "default"}
                        className="capitalize"
                    >
                        {status.toLowerCase()}
                    </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 italic">
                    &quot;{bio || "No bio provided yet."}&quot;
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                        <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                        {experienceYears > 0
                            ? `${experienceYears} years exp.`
                            : "New Tutor"}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                        {availabilitySlots?.length || 0} slots available
                    </div>
                </div>
            </CardContent>

            <CardFooter className=" p-4 flex items-center justify-between border-t">
                <div>
                    <span className="text-2xl font-bold text-primary">
                        ৳{hourlyRate}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                        / hour
                    </span>
                </div>
                <Button size="sm" className="px-6">
                    Book Now
                </Button>
            </CardFooter>
        </Card>
    );
}
