"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Users, CreditCard, Activity, Calendar } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

// Mock Data
const data = [
    { name: "Jan", total: 1200 },
    { name: "Feb", total: 2100 },
    { name: "Mar", total: 1800 },
    { name: "Apr", total: 3400 },
    { name: "May", total: 2900 },
    { name: "Jun", total: 4200 },
];

const Analytics = () => {
    return (
        <div className="flex flex-col gap-8 p-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Analytics
                    </h1>
                    <p className="text-muted-foreground">
                        Monitor your platform &rsquos; performance and booking
                        trends.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="mr-2 size-4" />
                        Download Report
                    </Button>
                    <Button size="sm">Generate Insights</Button>
                </div>
            </div>

            {/* Top Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value="$45,231.89"
                    icon={<CreditCard />}
                    trend="+20.1% from last month"
                />
                <StatCard
                    title="Active Tutors"
                    value="+2,350"
                    icon={<Users />}
                    trend="+180.1% from last month"
                />
                <StatCard
                    title="Sessions Booked"
                    value="+12,234"
                    icon={<Activity />}
                    trend="+19% from last month"
                />
                <StatCard
                    title="Active Now"
                    value="+573"
                    icon={<Activity />}
                    trend="+201 since last hour"
                />
            </div>

            {/* Main Charts Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-87.5 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient
                                            id="colorTotal"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="hsl(var(--primary))"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="hsl(var(--primary))"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="hsl(var(--muted))"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor:
                                                "hsl(var(--background))",
                                            borderColor: "hsl(var(--border))",
                                        }}
                                        itemStyle={{
                                            color: "hsl(var(--primary))",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="hsl(var(--primary))"
                                        fillOpacity={1}
                                        fill="url(#colorTotal)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            User {i + 1}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            user{i + 1}@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        +$99.00
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({
    title,
    value,
    icon,
    trend,
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: string;
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="size-4 text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{trend}</p>
        </CardContent>
    </Card>
);

export default Analytics;
