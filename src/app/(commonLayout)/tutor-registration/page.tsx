import TutorRegisterForm from "@/components/modules/tutorHub/TutorRegisterForm";
import { subjectService } from "@/service/subject.service";
import { userService } from "@/service/user.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Tutor Registration",
};

const TutorRegistar = async () => {
    const session = await userService.getSession();
    const subjects = await subjectService.getSubjects();
    // console.log(subject);
    //  console.log(session.data.user);
    const user = session?.data?.user || null;
    if (!user) return redirect("/");

    return (
        <div>
            <TutorRegisterForm user={user} subjects={subjects?.data} />
            {/* <TutorForm /> */}
        </div>
    );
};

export default TutorRegistar;
