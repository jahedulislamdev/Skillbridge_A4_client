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

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    setSession: (session) => set({ session }),
    clearSession: () => set({ session: null }),
}));
