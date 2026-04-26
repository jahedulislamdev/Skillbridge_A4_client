import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";
import { cookies } from "next/headers";
import { ServiceOptions } from "./tutor.service";
import { object } from "zod";
const auth_url = env.AUTh_URL;
const api_url = env.API_URL;

export interface UserProps {
    name: string;
    image: string;
}
export interface GetParams {
    search: string;
    limit: string;
    page: string;
}

export const userService = {
    getSession: async () => {
        const cookieStore = await cookies();
        try {
            const res = await fetch(`${auth_url}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const session = await res.json();
            if (!session) {
                return { data: null, error: { message: "session is missing" } };
            }
            return { data: session, error: null };
        } catch (err) {
            return {
                data: null,
                error: { message: "Something went wrong", details: err },
            };
        }
    },
    updateUser: async (id: string, updatedData: UserProps) => {
        const cookieStore = await cookies();
        try {
            const res = await fetch(`${api_url}/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(updatedData),
            });

            const data = await res.json();
            if (!data.success) {
                return { data: null, error: data.message };
            }
            return { data, error: null };
        } catch (err) {
            errorHandler(err);
        }
    },
    getUserById: async (userId: string) => {
        try {
            const res = await fetch(`${api_url}/users/${userId}`);
            const data = await res.json();
            if (!data.success) {
                return { data: null, error: data.message };
            }
            return { data: data.data, error: null };
        } catch (err) {
            errorHandler(err);
        }
    },
    getUsers: async (params?: GetParams, options?: ServiceOptions) => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${api_url}/users`);
            if (params) {
                Object.entries(params).forEach(([keyof, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(keyof, value);
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
            config.headers = {
                Cookie: cookieStore.toString(),
            };

            const res = await fetch(url.toString(), config);
            const data = await res.json();
            if (!data.success) {
                return { data: [], error: data.message };
            }
            return { data: data.data, error: null };
        } catch (err) {
            errorHandler(err);
        }
    },
};
