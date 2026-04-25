"use server";

import { bookingService } from "@/service/booking.service";

export const createBooking = async (slotId: string) => {
    return await bookingService.createBooking(slotId);
};
