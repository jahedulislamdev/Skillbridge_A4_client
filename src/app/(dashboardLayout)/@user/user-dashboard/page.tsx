import { redirect } from "next/navigation";

const UserDashboard = () => {
    return redirect("/user-dashboard/profile");
};

export default UserDashboard;
