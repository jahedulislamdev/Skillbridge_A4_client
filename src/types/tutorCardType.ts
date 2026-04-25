import { TutorStatus } from "@/constants/tutorStatus";
export interface TutorCard {
    id: string;
    user: { id: string; name: string; image: string };
    bio: string;
    averageRating: number;
    hourlyRate?: number;
    experienceYears: number;
    status: TutorStatus;
    availabilitySlots?: { id?: string }[];
    totalReviews?: number;
    tutorSubjects: {
        subjects: {
            id: string;
            name: string;
        };
    }[];
}
