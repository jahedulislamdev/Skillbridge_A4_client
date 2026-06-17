import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";
import { cookies } from "next/headers";
import { ServiceOptions } from "./tutor.service";

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
interface GetSlotParams {
    page?: string;
    limit?: string;
    skip?: string;
    search?: string;
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
    getSlots: async (params?: GetSlotParams, options?: ServiceOptions) => {
        try {
            const url = new URL(`${api_url}/slots`);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value);
                    }
                });
            }
            const config: RequestInit = {};
            if (options?.cache) {
                config.cache = options.cache;
            }
            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }
            const res = await fetch(url.toString(), config);
            const data = await res.json();
            if (!data.success) {
                return { data: null, error: "Failed to fetch" };
            }
            return { data, error: null };
        } catch (err) {
            return errorHandler(err);
        }
    },
    getSlotsByTutorId: async (tutorId: string) => {
        try {
            const res = await fetch(`${api_url}/slots/tutor/${tutorId}`, {
                cache: "no-store",
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
