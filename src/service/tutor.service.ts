import { env } from "@/env";

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
};

const errorHandler = (err: unknown) => {
    return {
        data: null,
        error: {
            message: "Faild to fetch tutors",
            details: err instanceof Error ? err.message : err,
        },
    };
};
