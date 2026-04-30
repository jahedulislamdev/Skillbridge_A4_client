import { userService } from "@/service/user.service";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ProfileForm from "@/components/modules/user/UserProfileForm";
import UserProfileForm from "@/components/modules/user/UserProfileForm";

export default async function UserProfilePage() {
    const res = await userService.getSession();
    const user = res.data?.user;
    // console.log(user);

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
        <div className="container max-w-4xl py-6 md:py-10">
            <Card className="mx-auto w-full max-w-3xl border-none shadow-none sm:border sm:shadow-sm">
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
                        <UserProfileForm user={user} />
                    </div>
                </div>
            </Card>
        </div>
    );
}
