import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    baseURL: "http://localhost:5000",
    // baseURL: process.env.NEXT_PUBLIC_FRONTEND_API,
    fetchOptions: { credentials: "include" },
});

export const signInWithGoogle = async () => {
    return await authClient.signIn.social({
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_API}`,
    });
};
