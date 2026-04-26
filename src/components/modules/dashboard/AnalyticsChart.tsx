"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

export function AnalyticsCharts({ stats }: { stats: any }) {
    // Data for User Pie Chart
    const userData = [
        { name: "Students", value: stats.users.students, color: "#10b981" }, // Emerald
        { name: "Tutors", value: stats.users.tutors, color: "#3b82f6" }, // Blue
        { name: "Admins", value: stats.users.admins, color: "#f59e0b" }, // Amber
    ];

    // Data for Booking Bar Chart
    const bookingData = [
        { status: "Pending", count: stats.bookings.pending, color: "#eab308" },
        {
            status: "Confirmed",
            count: stats.bookings.confirmed,
            color: "#3b82f6",
        },
        {
            status: "Completed",
            count: stats.bookings.completed,
            color: "#10b981",
        },
        {
            status: "Cancelled",
            count: stats.bookings.cancelled,
            color: "#ef4444",
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* User Distribution Pie Chart */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">
                        User Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={userData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {userData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "none",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Booking Status Bar Chart */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">
                        Booking Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bookingData}>
                            <XAxis
                                dataKey="status"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#888888", fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#888888", fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: "transparent" }}
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "none",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                            />
                            <Bar
                                dataKey="count"
                                radius={[4, 4, 0, 0]}
                                fill="#3b82f6"
                            >
                                {bookingData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
