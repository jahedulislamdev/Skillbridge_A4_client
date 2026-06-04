import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function BookingManagementSkeleton() {
    // Generates 5 dummy rows to represent loading booking items
    const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

    return (
        <div className="rounded-xl border bg-card shadow-sm">
            {/* Header Section Skeleton */}
            <div className="flex justify-between items-center p-6 border-b">
                <div className="space-y-2">
                    {/* Header Title Skeleton */}
                    <Skeleton className="h-7 w-48" />
                    {/* Header Subtitle Skeleton */}
                    <Skeleton className="h-4 w-72" />
                </div>
                <div>
                    {/* Bookings Count Badge Skeleton */}
                    <Skeleton className="h-5.5 w-24 rounded-full" />
                </div>
            </div>

            {/* Table Section Skeleton */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-37.5">
                                Date & Time
                            </TableHead>
                            <TableHead>Student Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Tutor Name</TableHead>
                            <TableHead>Tutor Email</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Meeting Link</TableHead>
                            <TableHead className="text-right">
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
                                {/* Date & Time Column (Stacked strings) */}
                                <TableCell>
                                    <div className="flex flex-col space-y-1.5">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-3 w-14" />
                                    </div>
                                </TableCell>

                                {/* Student Email Column */}
                                <TableCell>
                                    <Skeleton className="h-3.5 w-36" />
                                </TableCell>

                                {/* Role Column */}
                                <TableCell>
                                    <Skeleton className="h-3.5 w-12" />
                                </TableCell>

                                {/* Tutor Name Column */}
                                <TableCell>
                                    <Skeleton className="h-3.5 w-24" />
                                </TableCell>

                                {/* Tutor Email Column */}
                                <TableCell>
                                    <Skeleton className="h-3.5 w-36" />
                                </TableCell>

                                {/* Price Column */}
                                <TableCell>
                                    <Skeleton className="h-4 w-14" />
                                </TableCell>

                                {/* Status Column */}
                                <TableCell>
                                    <Skeleton className="h-5.5 w-16 rounded-md" />
                                </TableCell>

                                {/* Meeting Link Column */}
                                <TableCell>
                                    <Skeleton className="h-5.5 w-14 rounded-md" />
                                </TableCell>

                                {/* Actions Column */}
                                <TableCell className="text-right">
                                    <div className="flex justify-end">
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
