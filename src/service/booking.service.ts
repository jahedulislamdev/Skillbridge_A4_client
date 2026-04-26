import { BookingStatus } from "@/constants/bookingStatus";
import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";
import { cookies } from "next/headers";

const app_url = env.API_URL;

export interface BookingProps {
    status: BookingStatus;
    meetingLink?: string;
}

export const bookingService = {
    createBooking: async (slotId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${app_url}/bookings/${slotId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
            });
            console.log(res);
            return await res.json();
        } catch (err) {
            errorHandler(err);
        }
    },
    getBooking: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${app_url}/bookings`, {
                next: { revalidate: 60 },
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await res.json();
            if (!data.success) {
                return { data: null, error: data.message };
            }
            return { data: data.data, error: null };
        } catch (err) {
            errorHandler(err);
        }
    },
    updateBooking: async (bookingId: string, updatedData: BookingProps) => {
        try {
            const cookieStore = await cookies();
            // console.log(updatedData);

            const res = await fetch(`${app_url}/bookings/${bookingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(updatedData),
            });
            // console.log(res);

            return await res.json();
        } catch (err) {
            errorHandler(err);
        }
    },
};
