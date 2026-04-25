"use server";

import { UserProps, userService } from "@/service/user.service";

export const getUserSession = async () => {
    return await userService.getSession();
};

export const updateUser = async (id: string, data: UserProps) => {
    return await userService.updateUser(id, data);
};
