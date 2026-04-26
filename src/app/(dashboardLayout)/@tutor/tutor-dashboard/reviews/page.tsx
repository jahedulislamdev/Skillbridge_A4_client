import { reviewService } from "@/service/review.service";
import { userService } from "@/service/user.service";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";

const Review = async () => {
    const { data } = await userService.getSession();
    const userId = data?.user.id;
    const tutorResponse = await userService.getUserById(userId);
    const tutorProfileId = tutorResponse?.data?.tutorProfile?.id;

    const response = await reviewService.getReviewsByTutorId(tutorProfileId);
    const reviews = response?.data || [];

    return (
        <div className="container max-w-4xl py-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Student Reviews
                </h1>
                <p className="text-muted-foreground">
                    Feedback from students regarding your sessions.
                </p>
            </div>

            <div className="grid gap-4">
                {reviews.length > 0 ? (
                    reviews.map((review: any) => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                ) : (
                    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <p className="text-muted-foreground">
                            No reviews received yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

function ReviewCard({ review }: { review: any }) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${
                                    i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-muted text-muted"
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {format(new Date(review.createdAt), "PPP")}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-foreground leading-relaxed italic">
                    "{review.comment}"
                </p>
                <div className="mt-4 flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        S
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                        Student ID: {review.studentId.slice(0, 8)}...
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

export default Review;
