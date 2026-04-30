"use server";

import {
    TutorData,
    tutorService,
    UpdateTutorProps,
} from "@/service/tutor.service";

export const createTutor = async (data: TutorData) => {
    return await tutorService.createTutor(data);
};
export const updateTutor = async (tutorId: string, data: UpdateTutorProps) => {
    return await tutorService.updateTutor(tutorId, { data });
};
export const getTutorById = async (tutorId: string) => {
    return await tutorService.getTutorById(tutorId);
};
