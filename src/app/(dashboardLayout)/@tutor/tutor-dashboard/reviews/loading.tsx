import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ReviewLoading = () => {
  // 4ti review card dekhanor jonno dummy array
  const skeletonReviews = Array.from({ length: 4 });

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" /> {/* Student Reviews Title */}
        <Skeleton className="h-5 w-80" /> {/* Subtitle */}
      </div>

      {/* Review Cards List */}
      <div className="grid gap-4">
        {skeletonReviews.map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                {/* Stars Skeleton */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Skeleton key={starIdx} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
                {/* Date Skeleton */}
                <Skeleton className="h-4 w-24" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Comment Lines */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>

              {/* Student Info Footer */}
              <div className="mt-4 flex items-center gap-2">
                {/* Avatar Circle */}
                <Skeleton className="h-6 w-6 rounded-full" />
                {/* Student ID Text */}
                <Skeleton className="h-3 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewLoading;