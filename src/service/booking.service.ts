import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";
import { cookies } from "next/headers";

const app_url = env.API_URL;

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
            return await res.json();
        } catch (err) {
            errorHandler(err);
        }
    },
};
