import UserBookings from "@/app/(dashboardLayout)/@user/user-dashboard/my-bookings/page";
import { BookingCard } from "@/components/modules/booking/BookingCard";
import { bookingService } from "@/service/booking.service";
import { userStore } from "@/store/auth.store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming shadcn/ui

const TutorBookings = async () => {
    const { tutorId } = userStore.getState();
    const studentBookings = await bookingService.getBookingByTutorId(
        tutorId as string,
    );
    const bookings = studentBookings?.data || [];

    return (
        <div className="container max-w-5xl">
            <header className="mb-8 space-y-2">
                <p className="text-lg text-muted-foreground mb-2">
                    Manage your schedule as both a student and an instructor.
                </p>
            </header>

            <Tabs defaultValue="teaching" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                    <TabsTrigger value="learning">My Learning</TabsTrigger>
                    <TabsTrigger value="teaching">My Teaching</TabsTrigger>
                </TabsList>

                {/* AS A STUDENT */}
                <TabsContent value="learning" className="space-y-6">
                    <div className="rounded-xl border bg-card p-6">
                        <UserBookings />
                    </div>
                </TabsContent>

                {/* AS A TUTOR */}
                <TabsContent value="teaching" className="space-y-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">
                                Incoming Student Sessions
                            </h2>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                {bookings.length} Total Bookings
                            </span>
                        </div>

                        <div className="grid gap-6">
                            {bookings.length > 0 ? (
                                bookings.map((booking: any) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed rounded-2xl bg-muted/30">
                                    <p className="text-muted-foreground font-medium">
                                        No students have booked your slots yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TutorBookings;
