import { bookingService } from "@/service/booking.service";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Video } from "lucide-react";
import { StatusBadge } from "@/components/modules/booking/StatusBadge";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import AdminActionsBookings from "@/components/modules/booking/AdminActions";

const Bookings = async () => {
    const res = await bookingService.getBookings();
    const bookings = res?.data || [];

    return (
        <div className="rounded-xl border bg-card shadow-sm">
            <div className="flex justify-between items-center p-6 border-b">
                <div>
                    <h2 className="text-xl font-semibold">
                        Booking Management
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage and track all student bookings and payments.
                    </p>
                </div>
                <div>
                    <Badge variant="secondary">
                        {bookings.length} Bookings
                    </Badge>
                </div>
            </div>

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
                        {bookings.length > 0 ? (
                            bookings.map((booking: any) => (
                                <TableRow
                                    key={booking.id}
                                    className="hover:bg-muted/30 transition-colors"
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>
                                                {format(
                                                    new Date(
                                                        booking.scheduledAt,
                                                    ),
                                                    "MMM dd, yyyy",
                                                )}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {format(
                                                    new Date(
                                                        booking.scheduledAt,
                                                    ),
                                                    "hh:mm a",
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {booking.student.email}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {booking.student.role}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {booking.tutor.user.name}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {booking.tutor.user.email}
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        ${parseFloat(booking.price).toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={booking.status} />
                                    </TableCell>
                                    <TableCell>
                                        {booking.meetingLink ? (
                                            <Link
                                                href={booking.meetingLink}
                                                target="_blank"
                                                className="gap-2 flex items-center"
                                            >
                                                <Badge variant="destructive">
                                                    <Video className="w-4 h-4" />{" "}
                                                    Join
                                                </Badge>
                                            </Link>
                                        ) : (
                                            <span className="text-xs italic text-muted-foreground">
                                                Not set
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <AdminActionsBookings
                                            bookingId={booking.id}
                                            meetingLink={
                                                booking.meetingLinkm || ""
                                            }
                                            status={booking.status}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={9}
                                    className="h-32 text-center"
                                >
                                    No records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Bookings;
