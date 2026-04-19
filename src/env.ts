import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
    server: {
        BACKEND_API: z.url(),
        FRONTEND_API: z.url(),
        API_URL: z.url(),
        AUTh_URL: z.url(),
    },
    experimental__runtimeEnv: {
        BACKEND_API: process.env.BACKEND_API,
        FRONTEND_API: process.env.FRONTEND_API,
        API_URL: process.env.API_URL,
        AUTh_URL: process.env.AUTh_URL,
    },
});
