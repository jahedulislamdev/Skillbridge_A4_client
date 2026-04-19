import { env } from "@/env";
import { cookies } from "next/headers";
const auth_url = env.AUTh_URL;
export const userService = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();
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
};
