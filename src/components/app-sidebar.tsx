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

export function AppSidebar({
    user,
    ...props
}: {
    user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
    console.log("user role from app sidebar layout : ", user.role);

    let routes: Route[] = [];
    console.log("start:", routes);
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
    console.log("end :", routes);

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
                                                    // isActive={item.isActive}
                                                >
                                                    <a href={item.url}>
                                                        {item.title}
                                                    </a>
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
