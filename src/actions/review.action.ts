"use server";

import { reviewService } from "@/service/review.service";

export const getReviewsByTutorId = async (tutorId: string) => {
    return await reviewService.getReviewsByTutorId(tutorId);
};
export const createReview = async (
    bookingId: string,
    rating: number,
    comment: string,
) => {
    return await reviewService.createReview(bookingId, rating, comment);
};
