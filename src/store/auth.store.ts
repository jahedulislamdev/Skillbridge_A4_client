import { create } from "zustand";

type UserState = {
    userId: string | null;
    name: string | null;
    image: string | null;
    email: string | null;
    role: string | null;
    isBanned?: boolean;

    setUser: (data: {
        userId: string;
        name: string;
        image: string;
        email: string;
        role: string;
        isBanned?: boolean;
    }) => void;

    clearUser: () => void;
};

export const userStore = create<UserState>((set) => ({
    userId: null,
    email: null,
    name: null,
    image: null,
    role: null,
    isBanned: false,

    setUser: (data) => {
        set({
            userId: data.userId,
            name: data.name,
            email: data.email,
            image: data.image,
            role: data.role,
            isBanned: data.isBanned ?? false,
        });
    },

    clearUser: () => {
        set({
            userId: null,
            name: null,
            image: null,
            email: null,
            role: null,
            isBanned: false,
        });
    },
}));
