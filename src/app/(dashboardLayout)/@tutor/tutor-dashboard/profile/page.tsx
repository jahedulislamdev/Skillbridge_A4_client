import { userService } from "@/service/user.service";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ProfileForm from "@/components/modules/user/UserProfileForm";
import TutorProfileForm from "@/components/modules/tutorHub/TutorProfileForm";
import { subjectService } from "@/service/subject.service";
import { tutorService } from "@/service/tutor.service";

export default async function TutorProfilePage() {
    const { data } = await userService.getSession();
    // console.log(data);

    const userRes = await userService.getUserById(data.user.id);
    const subRes = await subjectService.getSubjects();
    const tutorRes = await tutorService.getTutorById(
        userRes?.data.tutorProfile?.id,
    );
    const user = userRes?.data;
    // console.log(user);

    const subjects = subRes?.data;
    // console.log(subjects);

    const tutor = tutorRes.data.data;
    // console.log(tutor);

    if (!user) {
        return (
            <div className="flex min-h-100 items-center justify-center p-4 text-center">
                <p className="text-muted-foreground">User not found</p>
            </div>
        );
    }

    return (
        /* - container: adds horizontal padding so the card doesn't hit the screen edges 
           - py-6: vertical breathing room for the whole page
        */
        <div className="container">
            <Card className="mx-auto max-w-4xl w-full border-none shadow-none sm:border sm:shadow-sm">
                <CardHeader className="space-y-1 px-4 sm:px-6">
                    <CardTitle className="text-xl font-semibold tracking-tight md:text-2xl">
                        Profile Settings
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Manage your account details and profile image.
                    </CardDescription>
                </CardHeader>

                <div className="px-4 sm:px-6">
                    <Separator className="mb-6" />
                    <div className="pb-6">
                        <TutorProfileForm
                            user={user}
                            subjects={subjects}
                            tutor={tutor}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}
