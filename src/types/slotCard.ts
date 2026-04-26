import { DayOfWeek } from "@/service/slots.service";

export interface SlotCard {
    id: string;
    tutorId: string;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
    createdAt: string;
    isBooked: boolean;
}
