import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";
import { ServiceOptions } from "./tutor.service";

const app_url = env.API_URL;
export const statsService = {
    getStates: async (options?: ServiceOptions) => {
        try {
            const confing: RequestInit = {};
            if (options?.cache) {
                confing.cache = options.cache;
            }
            if (options?.revalidate) {
                confing.next = { revalidate: options.revalidate ?? 0 };
            }
            const res = await fetch(`${app_url}/dashboard/stats`, confing);
            const data = await res.json();
            if (!data.success) {
                return { data: null, error: data.message };
            }
            return { data: data.data, error: null };
        } catch (err) {
            errorHandler(err);
        }
    },
};
