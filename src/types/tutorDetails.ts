import { TutorStatus } from "@/constants/tutorStatus";

export interface Student {
    name: string;
    image: string;
}

export interface BookingInfo {
    slotId: string;
    scheduledAt: string;
}

export interface Review {
    id: string;
    comment: string;
    rating: number;
    student: Student;
    booking: BookingInfo;
}

export interface AvailabilitySlot {
    id: string;
    tutorId: string;
    dayOfWeek: "SAT" | "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI";
    startTime: string;
    endTime: string;
    isBooked: boolean;
    createdAt: string;
}

export interface TutorUser {
    id: string;
    name: string;
    image: string;
}

export interface TutorDetail {
    id: string;
    userId: string;
    bio: string;
    hourlyRate: string;
    experienceYears: number;
    averageRating: number;
    status: TutorStatus;
    totalReviews: number;
    createdAt: string;
    updatedAt: string;
    user: TutorUser;
    availabilitySlots: AvailabilitySlot[];
    reviews: Review[];
}
