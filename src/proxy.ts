import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";
import { Roles } from "./constants/role";

export const proxy = async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    const { data } = await userService.getSession();
    //  console.log(data.user.role);
    // console.log(data);

    if (!data) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const userRole = data.user.role;
    // console.log(userRole);

    if (pathname.startsWith("/admin-dashboard") && userRole !== Roles.admin) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/tutor-dashboard") && userRole !== Roles.tutor) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/user-dashboard") && userRole !== Roles.user) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/dashboard") {
        if (userRole === Roles.admin) {
            return NextResponse.redirect(
                new URL("/admin-dashboard", request.url),
            );
        }
        if (userRole === Roles.tutor) {
            return NextResponse.redirect(
                new URL("/tutor-dashboard", request.url),
            );
        }
        if (userRole === Roles.user) {
            return NextResponse.redirect(
                new URL("/user-dashboard", request.url),
            );
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/admin-dashboard/:path*",
        "/tutor-dashboard/:path*",
        "/user-dashboard/:path*",
        "/dashboard",
    ],
};
