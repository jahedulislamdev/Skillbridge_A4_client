"use client";

import { userStore } from "@/store/auth.store";
import { useEffect } from "react";

export default function UserProvider({ children, initialUser }) {
    // console.log(initialUser);

    useEffect(() => {
        if (!initialUser?.user) return;
        userStore.getState().setUser({
            userId: initialUser.user.id,
            name: initialUser.user.name,
            image: initialUser.user.image,
            role: initialUser.user.role,
            email: initialUser.user.email,
        });
    }, [initialUser]);
    return <>{children}</>;
}
