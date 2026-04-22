import { TutorStatus } from "@/constants/tutorStatus";
export interface TutorCard {
    id: string;
    user: { id: string; name: string };
    bio: string;
    averageRating: number;
    hourlyRate?: number;
    experienceYears: number;
    status: TutorStatus;
    availabilitySlots?: { id?: string }[];
    totalReviews?: number;
}
