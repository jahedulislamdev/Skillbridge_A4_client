import { BookingCard } from "@/components/modules/booking/BookingCard";
import { bookingService } from "@/service/booking.service";

interface UserBookingsProps {
    hideHeader?: boolean;
}

export default async function UserBookings({
    hideHeader = false,
}: UserBookingsProps) {
    const response = await bookingService.getBookings();
    const bookings = response?.data || [];

    return (
        <div
            className={`container max-w-4xl ${hideHeader ? "py-0" : "py-10"} space-y-8`}
        >
            {!hideHeader && (
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        My Bookings
                    </h1>
                    <p className="text-muted-foreground">
                        Review and manage your scheduled learning sessions.
                    </p>
                </header>
            )}

            <div className="grid gap-6">
                {bookings.length > 0 ? (
                    bookings.map((booking: any) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            showCancel
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
                        <div className="text-center space-y-2">
                            <p className="text-xl font-medium text-foreground">
                                No sessions found
                            </p>
                            <p className="text-muted-foreground">
                                You haven't booked any learning sessions yet.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
