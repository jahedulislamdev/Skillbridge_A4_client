"use server";

import { SlotProps, slotService } from "@/service/slots.service";

export const createSlot = async (data: SlotProps) => {
    return await slotService.createSlot(data);
};
export const deleteSlot = async (slotId: string) => {
    return await slotService.delteSlot(slotId);
};
