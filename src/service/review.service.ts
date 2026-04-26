import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";

const api_url = env.API_URL;
//* we define availabe slots to avalilabe sessions
export const reviewService = {
    getReviews: async () => {
        try {
            const res = await fetch(`${api_url}/reviews`);
            const data = await res.json();
            if (!data.success) {
                return { data: null, err: data.message };
            }

            // console.log(data);

            return { data: data.data, error: null };
        } catch (err) {
            return errorHandler(err);
        }
    },
    getReviewsByTutorId: async (tutorId: string) => {
        try {
            const res = await fetch(`${api_url}/reviews/tutor/${tutorId}`);
            const data = await res.json();
            if (!data.success) {
                return { data: null, err: data.message };
            }

            return { data: data.data, error: null };
        } catch (err) {
            return errorHandler(err);
        }
    },
};
