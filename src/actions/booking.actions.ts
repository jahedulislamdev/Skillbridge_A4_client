"use server";

import { BookingProps, bookingService } from "@/service/booking.service";

export const createBooking = async (slotId: string) => {
    return await bookingService.createBooking(slotId);
};
export const updateBooking = async (bookingId: string, data: BookingProps) => {
    return await bookingService.updateBooking(bookingId, data);
};
