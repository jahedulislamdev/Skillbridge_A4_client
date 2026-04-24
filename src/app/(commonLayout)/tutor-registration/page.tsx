import TutorRegisterForm from "@/components/modules/tutorHub/TutorRegisterForm";
import { subjectService } from "@/service/subject.service";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

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
        </div>
    );
};

export default TutorRegistar;
