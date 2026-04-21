import { env } from "@/env";

const app_url = env.API_URL;
interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}
interface GetTutorParams {
    searchValue?: string;
    rating?: number;
    page?: number;
    limit?: number;
    skip?: number;
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
            return {
                data: null,
                error: {
                    message: "something went wrong",
                    details: err instanceof Error ? err.message : err,
                },
            };
        }
    },
};
