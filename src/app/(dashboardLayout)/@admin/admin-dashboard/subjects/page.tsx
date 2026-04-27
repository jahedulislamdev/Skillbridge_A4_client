import SubjectClient from "@/components/modules/subjects/subjectClient";
import { subjectService } from "@/service/subject.service";

const Subjects = async () => {
    const res = await subjectService.getSubjects();
    const subjects = res?.data || [];

    return (
        <div className="container max-w-5xl py-3">
            <SubjectClient initialData={subjects} />
        </div>
    );
};

export default Subjects;
