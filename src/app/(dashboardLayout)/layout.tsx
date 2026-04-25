import { AppSidebar } from "@/components/layout/app-sidebar";
import { ModeToggle } from "@/components/layout/Modetoggle";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Roles } from "@/constants/role";
import { userService } from "@/service/user.service";
import React from "react";

export default async function Page({
    admin,
    tutor,
    user,
}: {
    admin: React.ReactNode;
    tutor: React.ReactNode;
    user: React.ReactNode;
}) {
    const { data } = await userService.getSession();
    const role = data.user.role;
    // console.log("user role from dashboard layout : ", role);

    const roleView = {
        [Roles.admin]: admin,
        [Roles.tutor]: tutor,
        [Roles.user]: user,
    };
    const currentView = roleView[role] ?? <div>Unauthorized</div>;

    return (
        <SidebarProvider>
            <AppSidebar user={data?.user} />
            <SidebarInset>
                <header className="flex pr-5 h-16 shrink-0 items-center justify-between gap-2 bg-card border-b sticky top-0 z-20">
                    <div className="flex items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                        />

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Build Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <ModeToggle />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {currentView}
                </div>
            </SidebarInset>
            <Toaster position="top-right" richColors />
        </SidebarProvider>
    );
}
