import { BookingCard } from "@/components/modules/booking/BookingCard";
import { bookingService } from "@/service/booking.service";
// Import the client component

export default async function UserBookings() {
    const response = await bookingService.getBooking();
    const bookings = response?.data || [];

    return (
        <div className="container max-w-4xl py-10 space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    My Bookings
                </h1>
                <p className="text-muted-foreground">
                    Review and manage your scheduled learning sessions.
                </p>
            </header>

            <div className="grid gap-6">
                {bookings.length > 0 ? (
                    bookings.map((booking: any) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))
                ) : (
                    <div className="text-center py-20 border rounded-lg border-dashed">
                        <p className="text-muted-foreground">
                            No sessions found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
