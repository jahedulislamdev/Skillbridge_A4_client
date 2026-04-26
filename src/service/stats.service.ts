import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";

const app_url = env.API_URL;
export const statsService = {
    getStates: async () => {
        try {
            const res = await fetch(`${app_url}/dashboard/stats`);
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
