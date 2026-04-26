import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const UserLoading = () => {
    // Create an array of 8 items to represent loading rows
    const skeletonRows = Array.from({ length: 8 });

    return (
        <div className="container max-w-7xl py-10 space-y-6">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-[250px]" />
                    <Skeleton className="h-4 w-[350px]" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-full md:w-64" />
                    <Skeleton className="h-10 w-20" />
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Verification</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skeletonRows.map((_, i) => (
                            <TableRow key={i}>
                                <TableCell className="flex items-center gap-3">
                                    {/* Avatar Circle */}
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                    <div className="space-y-2">
                                        {/* Name */}
                                        <Skeleton className="h-4 w-[140px]" />
                                        {/* Email */}
                                        <Skeleton className="h-3 w-[100px]" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {/* Role Badge */}
                                    <Skeleton className="h-5 w-16 rounded-full" />
                                </TableCell>
                                <TableCell>
                                    {/* Verification Badge */}
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </TableCell>
                                <TableCell>
                                    {/* Status Badge */}
                                    <Skeleton className="h-5 w-16 rounded-full" />
                                </TableCell>
                                <TableCell>
                                    {/* Date */}
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                                <TableCell className="text-right">
                                    {/* Action Button */}
                                    <div className="flex justify-end">
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Footer Skeleton */}
            <div className="flex items-center justify-between px-2">
                <Skeleton className="h-4 w-40" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-20" />
                </div>
            </div>
        </div>
    );
};

export default UserLoading;
