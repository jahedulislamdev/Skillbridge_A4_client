import TutorCard from "@/components/modules/home/TutorCard";
import { tutorService } from "@/service/tutor.service";
import { TutorCard as tutor } from "@/types/tutorCardType";

export default async function Home() {
    // we can't get session bcz for getting session we have to send cookie to server
    // though it's a server component it's have no access in borwer cookies
    // that's why we need to send it manually ,

    //* const session = await authClient.getSession();
    // const session = authClient.useSession(); //* is's a reactive way to get session but in client component
    // console.log(session);
    const { data } = await tutorService.getTutors({});
    const tutors = data?.data?.tutors;

    return (
        <div className="grid grid-cols-3 mx-auto max-w-7xl p-4 gap-4">
            {!tutors || tutors.length === 0 ? (
                <h3 className="text-xl font-semibold text-center col-span-5 text-red-200">
                    Faild to load tutors
                </h3>
            ) : (
                tutors?.map((t: tutor) => <TutorCard key={t.id} tutor={t} />)
            )}
        </div>
    );
}
