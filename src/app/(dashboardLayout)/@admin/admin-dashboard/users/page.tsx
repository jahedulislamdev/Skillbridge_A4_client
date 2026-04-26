import { userService } from "@/service/user.service";
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShieldAlert, UserCheck, Mail } from "lucide-react";
import { format } from "date-fns";
import SearchBox from "@/components/modules/tutorHub/Search";
import { PaginationController } from "@/components/layout/Pagination";

const UserManagement = async ({
    searchParams,
}: {
    searchParams: Promise<{ search: string; limit: string; page: string }>;
}) => {
    const { limit, page, search } = await searchParams;
    const response = await userService.getUsers(
        { limit, page, search },
        { revalidate: 60 },
    );
    // console.log(response);

    const users = response?.data.users || [];
    const meta = response?.data.meta;

    return (
        <div className="container max-w-7xl py-3 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        User Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage user roles, account status, and permissions.
                    </p>
                </div>
                <SearchBox placeholder="Search by name or email" />
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-62.5">User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border">
                                        <AvatarImage
                                            src={user.image}
                                            alt={user.name}
                                        />
                                        <AvatarFallback>
                                            {user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm line-clamp-1">
                                            {user.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Mail className="h-3 w-3" />{" "}
                                            {user.email}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <RoleBadge role={user.role} />
                                </TableCell>
                                <TableCell>
                                    {user.emailVerified ? (
                                        <Badge
                                            variant="secondary"
                                            className="bg-emerald-50 text-emerald-700 border-emerald-200"
                                        >
                                            Verified
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="text-muted-foreground"
                                        >
                                            Pending
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {user.isBanned ? (
                                        <Badge
                                            variant="destructive"
                                            className="flex w-fit items-center gap-1"
                                        >
                                            <ShieldAlert className="h-3 w-3" />{" "}
                                            Banned
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="flex w-fit items-center gap-1 text-emerald-600 border-emerald-200"
                                        >
                                            <UserCheck className="h-3 w-3" />{" "}
                                            Active
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-muted-foreground text-xs font-medium">
                                    {format(
                                        new Date(user.createdAt),
                                        "MMM dd, yyyy",
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Placeholder */}
            <PaginationController meta={meta} />
        </div>
    );
};

// Sub-component for Role styling
function RoleBadge({ role }: { role: string }) {
    const styles: Record<string, string> = {
        ADMIN: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100",
        TUTOR: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
        USER: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100",
    };

    return (
        <Badge
            className={`${styles[role] || styles.USER} border shadow-none font-semibold text-[10px]`}
        >
            {role}
        </Badge>
    );
}

export default UserManagement;
