"use client";

import { userStore } from "@/store/auth.store";
import { useEffect } from "react";
import { getUserSession } from "@/actions/user.actions";

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const loadUser = async () => {
            const { data } = await getUserSession();

            if (!data?.user) return;

            userStore.getState().setUser({
                userId: data.user.id,
                name: data.user.name,
                image: data.user.image,
                role: data.user.role,
                email: data.user.email,
                isBanned: data.user.isBanned,
            });
        };

        loadUser();
    }, []);

    return <>{children}</>;
}
