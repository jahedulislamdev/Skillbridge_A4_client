import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";

const api_url = env.API_URL;
//* we define availabe slots to avalilabe sessions
export const slotService = {
    getSlots: async () => {
        try {
            const res = await fetch(`${api_url}/slots`);
            const data = await res.json();
            if (!data.success) {
                return { data: null, err: "something went wrong!" };
            }
            return { data, error: null };
        } catch (err) {
            return errorHandler(err);
        }
    },
};
