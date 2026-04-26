"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { Route } from "@/types/routesType";
import { Roles } from "@/constants/role";
import Link from "next/link";
import { usePathname } from "next/navigation";

const logo = {
    url: "/",
    src: "https://i.postimg.cc/xT9kq48w/logo-removebg.png",
    alt: "logo",
    title: "skillbridge",
};
export function AppSidebar({
    user,
    ...props
}: {
    user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
    // console.log("user role from app sidebar layout : ", user.role);

    let routes: Route[] = [];
    // console.log("start:", routes);
    switch (user.role) {
        case Roles.admin:
            routes = adminRoutes;
            break;
        case Roles.tutor:
            routes = tutorRoutes;
            break;
        case Roles.user:
            routes = userRoutes;
            break;
        default:
            routes = [];
            break;
    }
    // console.log("end :", routes);
    const pathname = usePathname();

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                        ></SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center pb-5 px-5 sticky top-0 z-20 bg-card">
                        <Link
                            href={logo.url}
                            className="flex items-center gap-2 transition-opacity hover:opacity-90"
                        >
                            <img
                                src={logo.src}
                                className="h-9 w-auto dark:invert"
                                alt={logo.alt}
                            />
                            <span className="hidden font-bold uppercase tracking-tight sm:inline-block">
                                {logo.title}
                            </span>
                        </Link>
                    </div>
                    <SidebarMenu>
                        {routes.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild></SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub>
                                        {item.items.map((item) => (
                                            <SidebarMenuSubItem
                                                key={item.title}
                                            >
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={
                                                        pathname === item.url
                                                    }
                                                >
                                                    <Link
                                                        href={item.url || "#"}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
