import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BookingsLoading() {
  // 5ti dummy card loop korar jonno
  const skeletonCards = Array.from({ length: 2 });

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      {/* Header Skeleton */}
      <header className="space-y-2">
        <Skeleton className="h-9 w-48" /> {/* Title: My Bookings */}
        <Skeleton className="h-5 w-80" /> {/* Subtitle text */}
      </header>

      {/* Bookings List Skeleton */}
      <div className="grid gap-6">
        {skeletonCards.map((_, i) => (
          <Card key={i} className="overflow-hidden shadow-sm border">
            <div className="flex flex-col md:flex-row gap-4 p-4">
              {/* Image/Icon Placeholder */}
              <Skeleton className="h-24 w-full md:w-32 rounded-lg" />
              
              <div className="flex-1 space-y-3 py-1">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    {/* Subject Name */}
                    <Skeleton className="h-5 w-40" />
                    {/* Tutor Name */}
                    <Skeleton className="h-4 w-28" />
                  </div>
                  {/* Status Badge */}
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <div className="flex flex-wrap gap-4 mt-2">
                  {/* Date/Time Info */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons Section */}
            <div className="bg-muted/30 px-4 py-3 flex justify-end gap-2 border-t">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}