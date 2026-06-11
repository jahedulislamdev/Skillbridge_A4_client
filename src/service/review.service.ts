import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";
import { cookies } from "next/headers";

const api_url = env.API_URL;
//* we define availabe slots to avalilabe sessions
export const reviewService = {
    createReview: async (
        bookingId: string,
        rating: number,
        comment: string,
    ) => {
        const cookieStore = await cookies();
        try {
            const res = await fetch(`${api_url}/reviews/${bookingId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ bookingId, rating, comment }),
            });
            const data = await res.json();
            if (!data.success) {
                return { success: false, error: data.message };
            }
            return data;
        } catch (err) {
            return errorHandler(err);
        }
    },
    getReviews: async () => {
        try {
            const res = await fetch(`${api_url}/reviews`, {
                next: { revalidate: 60 },
            });
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
            const res = await fetch(`${api_url}/reviews/tutor/${tutorId}`, {
                cache: "no-store",
            });
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
