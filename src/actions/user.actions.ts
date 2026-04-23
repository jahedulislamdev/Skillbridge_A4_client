"use server";

import { userService } from "@/service/user.service";

export const getUserSession = async () => {
    return await userService.getSession();
};
