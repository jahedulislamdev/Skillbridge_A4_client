"use server";

import { subjectService } from "@/service/subject.service";

export const createSubject = async (subject: string) => {
    return await subjectService.createSubject(subject);
};
export const getSubjects = async () => {
    return await subjectService.getSubjects();
};
export const updateSubject = async (subject: string, subjectId: string) => {
    return await subjectService.updateSubject(subject, subjectId);
};
export const deleteSubject = async (subjectId: string) => {
    return await subjectService.deleteSubject(subjectId);
};
