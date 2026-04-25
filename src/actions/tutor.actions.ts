"use server";

import { TutorData, tutorService } from "@/service/tutor.service";

export const createTutor = async (data: TutorData) => {
    return await tutorService.createTutor(data);
};
