import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";
import { cookies } from "next/headers";

export enum DayOfWeek {
    SUN = "SUN",
    MON = "MON",
    TUE = "TUE",
    WED = "WED",
    THU = "THU",
    FRI = "FRI",
    SAT = "SAT",
}
export interface SlotProps {
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
}
const api_url = env.API_URL;

//* we define availabe slots to avalilabe sessions
export const slotService = {
    createSlot: async (data: SlotProps) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${api_url}/slots`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });
            return await res.json();
        } catch (err) {
            errorHandler(err);
        }
    },
    getSlots: async () => {
        try {
            const res = await fetch(`${api_url}/slots`);
            const data = await res.json();
            if (!data.success) {
                return { data: null, err: data.message };
            }
            // console.log(data);

            return { data, error: null };
        } catch (err) {
            return errorHandler(err);
        }
    },
    getSlotsByTutorId: async (tutorId: string) => {
        try {
            const res = await fetch(`${api_url}/slots/tutor/${tutorId}`);
            const data = await res.json();
            if (!data.success) {
                return { data: null, error: data.message };
            }
            return { data: data.data, error: null };
        } catch (err) {
            errorHandler(err);
        }
    },
    delteSlot: async (slotId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${api_url}/slots/${slotId}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });
            return await res.json();
        } catch (err) {
            errorHandler(err);
        }
    },
};
