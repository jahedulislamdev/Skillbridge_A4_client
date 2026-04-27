import UserBookings from "@/app/(dashboardLayout)/@user/user-dashboard/my-bookings/page";
import { bookingService } from "@/service/booking.service";
import { userStore } from "@/store/auth.store";

const TutorBookings = async () => {
    const { tutorId } = userStore.getState();
    const studentBookings = await bookingService.getBookingByTutorId(
        tutorId as string,
    );
    console.log(studentBookings);

    return (
        <div>
            <UserBookings />
            {/* students who booked my slot */}
            <p>Student booked slots</p>
        </div>
    );
};

export default TutorBookings;
