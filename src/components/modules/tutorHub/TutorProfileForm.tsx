"use client";

import { User, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { updateTutor } from "@/actions/tutor.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TutorForm } from "./TutorForm";
import UserProfileForm from "../user/UserProfileForm";
import { useRouter } from "next/navigation";

export default function TutorProfileForm({
    user,
    subjects,
    tutor,
}: {
    user: any;
    subjects: any[];
    tutor: any;
}) {
    const router = useRouter();
    const handleTutorUpdate = async (value: any) => {
        const res = await updateTutor(tutor.id, value);
        if (!res.success) {
            toast.error(res.message);
            return;
        }
        router.refresh();
        toast.success("Tutor profile updated!");
    };

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-10">
            <Tabs defaultValue="account" className="space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <TabsList className="grid w-full grid-cols-2 sm:w-100">
                        <TabsTrigger value="account" className="gap-2">
                            <User className="h-4 w-4" /> Account
                        </TabsTrigger>
                        <TabsTrigger value="tutor" className="gap-2">
                            <GraduationCap className="h-4 w-4" /> Tutor Profile
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="account" className="space-y-6 outline-none">
                    <UserProfileForm user={user} />
                </TabsContent>

                <TabsContent value="tutor" className="space-y-6 outline-none">
                    <TutorForm
                        subjects={subjects}
                        submitText="Update Tutor Details"
                        defaultValues={{
                            bio: tutor?.bio || "",
                            hourlyRate: tutor?.hourlyRate ?? 0,
                            experienceYears: tutor?.experienceYears ?? 0,
                            subjectIds:
                                tutor?.tutorSubjects?.map(
                                    (s: any) => s.subjects.id,
                                ) || [],
                        }}
                        onSubmit={handleTutorUpdate}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
