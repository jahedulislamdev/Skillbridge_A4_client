import { create } from "zustand";

export type Session = {
    id: string;
    userId: string;
    token: string;
    ipAddress?: string;
    userAgent?: string;

    createdAt: string;
    updatedAt: string;
    expiresAt: string;
} | null;

type AuthState = {
    session: Session;
    setSession: (session: Session) => void;
    clearSession: () => void;
};

type UserState = {
    userId: string | null;
    name: string | null;
    image: string | null;
    role: string | null;
    tutorId: string | null;

    setUser: (data: {
        userId: string;
        name: string;
        image: string;
        role: string;
        tutorId?: string;
    }) => void;

    clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    setSession: (session) => set({ session }),
    clearSession: () => set({ session: null }),
}));

export const userStore = create<UserState>((set) => ({
    userId: null,
    name: null,
    image: null,
    role: null,
    tutorId: null,

    setUser: (data) => {
        set({
            userId: data.userId,
            name: data.name,
            image: data.image,
            role: data.role,
            tutorId: data.tutorId,
        });
    },
    clearUser: () => {
        set({
            userId: null,
            name: null,
            image: null,
            role: null,
            tutorId: null,
        });
    },
}));
