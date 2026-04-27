"use server";

import { reviewService } from "@/service/review.service";

export const getReviewsByTutorId = async (tutorId: string) => {
    return await reviewService.getReviewsByTutorId(tutorId);
};
