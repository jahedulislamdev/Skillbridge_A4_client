import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";

const api_url = env.API_URL;
export const subjectService = {
    getSubjects: async () => {
        try {
            const res = await fetch(`${api_url}/subjects`);
            const data = await res.json();
            if (!data.success) {
                return { data: null, error: "something went wrong" };
            }
            return { data: data.data, error: null };
        } catch (err) {
            errorHandler(err);
        }
    },
};
