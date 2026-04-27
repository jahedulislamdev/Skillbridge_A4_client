import { env } from "@/env";
import { errorHandler } from "@/helper/errHandler";
import { cookies } from "next/headers";

const api_url = env.API_URL;
export const subjectService = {
    createSubject: async (subject: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${api_url}/subjects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(subject),
            });
            return await res.json();
        } catch (err) {
            errorHandler(err);
        }
    },
    updateSubject: async (subject: string, subjectId: string) => {
        try {
            const cookieStore = await cookies();
            console.log("update info:", { subject, subjectId });

            const res = await fetch(`${api_url}/subjects/${subjectId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name: subject }),
            });
            return await res.json();
        } catch (err) {
            errorHandler(err);
        }
    },
    deleteSubject: async (id: string) => {
        try {
            const cookieStore = await cookies();
            // console.log();

            const res = await fetch(`${api_url}/subjects/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });
            return await res.json();
        } catch (err) {
            errorHandler(err);
        }
    },
    getSubjects: async () => {
        try {
            const res = await fetch(`${api_url}/subjects`, {
                next: { revalidate: 100 },
            });
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
