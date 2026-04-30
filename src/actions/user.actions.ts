"use server";

import { UserProps, userService } from "@/service/user.service";
import { userStore } from "@/store/auth.store";

export const getUserStore = async () => {
    return userStore();
};

export const getUserSession = async () => {
    return await userService.getSession();
};

export const updateUser = async (id: string, data: UserProps) => {
    return await userService.updateUser(id, data);
};

export const getUserById = async (id: string) => {
    return await userService.getUserById(id);
};
