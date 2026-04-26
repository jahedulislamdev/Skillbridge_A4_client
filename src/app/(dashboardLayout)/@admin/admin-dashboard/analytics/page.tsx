import { statsService } from "@/service/stats.service";
import { Users, CalendarCheck, BookOpen, Star } from "lucide-react";
import { AnalyticsCharts } from "@/components/modules/dashboard/AnalyticsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = async () => {
    const response = await statsService.getStates();
    const stats = response?.data;

    if (!stats)
        return (
            <div className="p-8 text-center text-muted-foreground">
                No data available
            </div>
        );

    return (
        <div className="container max-w-7xl py-2 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Platform Analytics
                </h1>
                <p className="text-muted-foreground">
                    Visual overview of platform growth and activity.
                </p>
            </div>

            {/* High-Level Metric Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Users"
                    value={stats.users.total}
                    icon={<Users className="h-4 w-4" />}
                />
                <StatCard
                    title="Total Bookings"
                    value={stats.bookings.total}
                    icon={<CalendarCheck className="h-4 w-4" />}
                />
                <StatCard
                    title="Active Subjects"
                    value={stats.subjects.total}
                    icon={<BookOpen className="h-4 w-4" />}
                />
                <StatCard
                    title="Total Reviews"
                    value={stats.reviews.total}
                    icon={<Star className="h-4 w-4" />}
                />
            </div>

            {/* Interactive Charts Section */}
            <AnalyticsCharts stats={stats} />
        </div>
    );
};

function StatCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
}) {
    return (
        <Card className="shadow-sm border-none bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}

export default Analytics;
