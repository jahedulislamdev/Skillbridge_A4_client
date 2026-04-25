import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";
import { cookies } from "next/headers";

const app_url = env.API_URL;
interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}
interface GetTutorParams {
    search?: string;
    rating?: number;
    page?: string;
    limit?: string;
    skip?: string;
    priceMin?: number;
    priceMax?: number;
}
export interface TutorData {
    bio: string;
    hourlyRate: number;
    experienceYears?: number;
    subjectIds: string[];
}

export const tutorService = {
    getTutors: async (params?: GetTutorParams, options?: ServiceOptions) => {
        try {
            const url = new URL(`${app_url}/tutors`);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value);
                    }
                });
            }
            console.log(url.toString());
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
                return { data: null, error: "Faild to fetch" };
            }
            return { data, error: null };
        } catch (err: unknown) {
            return errorHandler(err);
        }
    },
    getTutorById: async (id: string) => {
        try {
            const res = await fetch(`${app_url}/tutors/${id}`);
            const data = await res.json();
            if (!data.success) {
                return { data: null, err: "something went wrong!" };
            }
            return { data: data, error: null };
        } catch (err) {
            return errorHandler(err);
        }
    },
    createTutor: async (data: TutorData) => {
        try {
            // console.log("data from tutor service: ", data);

            const cookieStore = await cookies();
            const res = await fetch(`${app_url}/tutors`, {
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
};
