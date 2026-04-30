import { tutorService } from "@/service/tutor.service";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Info, Users } from "lucide-react";
import AdminActionsInTutors from "@/components/modules/tutorHub/AdminActions";
import { PaginationController } from "@/components/layout/Pagination";
import SearchBox from "@/components/modules/tutorHub/Search";

const TutorManagement = async ({
    searchParams,
}: {
    searchParams: Promise<{
        limit: string;
        page: string;
        search: string;
    }>;
}) => {
    const { limit, page, search } = await searchParams;

    // Fetching data with search and pagination params
    const { data } = await tutorService.getTutors(
        { limit, page, search },
        { cache: "no-store" },
    );

    const tutors = data?.data?.tutors || [];
    const pagination = data?.data?.meta || {
        limit: 10,
        page: 1,
        totalPage: 1,
        total: 0,
    };

    return (
        <div className="p-8 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Tutor Management
                    </h1>
                    <p className="text-muted-foreground italic">
                        Review applications and manage platform tutors.
                    </p>
                </div>
                <Badge
                    variant="secondary"
                    className="w-fit h-fit px-4 py-1 text-sm font-medium gap-2"
                >
                    <Users className="h-4 w-4" />
                    Total Tutors: {pagination.total}
                </Badge>
            </div>

            {/* Filter Section */}
            <div className="bg-muted/40 p-4 rounded-lg flex items-center justify-between gap-4">
                <div className="w-full max-w-md">
                    <SearchBox placeholder="Search by name or subject..." />
                </div>
                {/* Space for more filters if needed */}
            </div>

            {/* Table Section */}
            <div className="rounded-md border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[280px]">Tutor</TableHead>
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
                        {tutors.length > 0 ? (
                            tutors.map((tutor: any) => (
                                <TableRow
                                    key={tutor.id}
                                    className="hover:bg-muted/20 transition-colors"
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                                                <AvatarImage
                                                    src={tutor.user?.image}
                                                    alt={tutor.user?.name}
                                                />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {tutor.user?.name
                                                        ?.charAt(0)
                                                        .toUpperCase() || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="capitalize font-semibold text-sm">
                                                    {tutor.user?.name ||
                                                        "Unknown"}
                                                </span>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    {tutor.averageRating} (
                                                    {tutor.totalReviews})
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                            {tutor.tutorSubjects?.map(
                                                (sub: any) => (
                                                    <Badge
                                                        key={sub.subjects.id}
                                                        variant="outline"
                                                        className="font-normal text-[10px] bg-background px-1.5 py-0"
                                                    >
                                                        {sub.subjects.name}
                                                    </Badge>
                                                ),
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {tutor.experienceYears} Years
                                    </TableCell>
                                    <TableCell className="text-sm font-medium">
                                        ৳{tutor.hourlyRate}
                                        <span className="text-[10px] font-normal text-muted-foreground ml-1">
                                            /hr
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                tutor.status === "PENDING"
                                                    ? "border-amber-500 text-amber-600 bg-amber-50 hover:bg-amber-100 shadow-none"
                                                    : "bg-emerald-500 hover:bg-emerald-600 shadow-none"
                                            }
                                            variant={
                                                tutor.status === "PENDING"
                                                    ? "outline"
                                                    : "default"
                                            }
                                        >
                                            {tutor.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right px-6">
                                        <AdminActionsInTutors tutor={tutor} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-40 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                                        <Info className="h-8 w-8 opacity-20" />
                                        <span className="text-sm font-medium">
                                            No results found for your search.
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Section */}
            <div className="flex justify-center pt-4 border-t">
                <PaginationController meta={pagination} />
            </div>
        </div>
    );
};

export default TutorManagement;
