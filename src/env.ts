import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
    server: {
        BACKEND_API: z.url(),
        API_URL: z.url(),
        AUTH_URL: z.url(),
    },

    client: {
        NEXT_PUBLIC_FRONTEND_API: z.url(),
        NEXT_PUBLIC_BACKEND_API: z.url(),
    },

    experimental__runtimeEnv: {
        NEXT_PUBLIC_FRONTEND_API: process.env.NEXT_PUBLIC_FRONTEND_API,
        NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
    },
});
