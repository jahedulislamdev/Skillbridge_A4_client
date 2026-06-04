import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function TutorManagementSkeleton() {
    // Generates 5 dummy rows to represent loading table data
    const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

    return (
        <div className="p-8 space-y-6">
            {/* Header Section Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    {/* Title Skeleton */}
                    <Skeleton className="h-9 w-64" />
                    {/* Subtitle Skeleton */}
                    <Skeleton className="h-5 w-80" />
                </div>
                {/* Total Badge Skeleton */}
                <Skeleton className="w-35 h-7.5 rounded-full" />
            </div>

            {/* Filter Section Skeleton */}
            <div className="bg-muted/40 p-4 rounded-lg flex items-center justify-between gap-4">
                <div className="w-full max-w-md">
                    {/* SearchBox Skeleton */}
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>

            {/* Table Section Skeleton */}
            <div className="rounded-md border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-70">Tutor</TableHead>
                            <TableHead>Subjects</TableHead>
                            <TableHead>Experience</TableHead>
                            <TableHead>Rate</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right px-6">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skeletonRows.map((index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-transparent"
                            >
                                {/* Tutor Column (Avatar + Name & Rating info) */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-28" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Subjects Column (List of tags) */}
                                <TableCell>
                                    <div className="flex flex-wrap gap-1 max-w-50">
                                        <Skeleton className="h-4 w-12 rounded" />
                                        <Skeleton className="h-4 w-16 rounded" />
                                        <Skeleton className="h-4 w-14 rounded" />
                                    </div>
                                </TableCell>

                                {/* Experience Column */}
                                <TableCell>
                                    <Skeleton className="h-4 w-16" />
                                </TableCell>

                                {/* Rate Column */}
                                <TableCell>
                                    <Skeleton className="h-4 w-20" />
                                </TableCell>

                                {/* Status Column */}
                                <TableCell>
                                    <Skeleton className="h-5.5 w-20 rounded-md" />
                                </TableCell>

                                {/* Actions Column */}
                                <TableCell className="text-right px-6">
                                    <div className="flex justify-end">
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Section Skeleton */}
            <div className="flex justify-center pt-4 border-t">
                <Skeleton className="h-9 w-64 rounded-md" />
            </div>
        </div>
    );
}
