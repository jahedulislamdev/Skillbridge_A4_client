"use client";
import { GraduationCap, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./Modetoggle";
import { useEffect } from "react";
import { getUserSession } from "@/actions/user.actions";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    className?: string;
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
        className?: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        beTutor: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar = ({
    logo = {
        url: "/",
        src: "https://i.postimg.cc/xT9kq48w/logo-removebg.png",
        alt: "logo",
        title: "skillbridge",
    },
    menu = [
        {
            title: "Sessions",
            url: "/sessions",
        },
        {
            title: "Tutor Hub",
            url: "/tutors",
        },
        {
            title: "Categories",
            url: "/categories",
        },
        {
            title: "Dashboard",
            url: "/dashboard",
        },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        beTutor: { title: "Be a Tutor", url: "/tutor-registration" },
        signup: { title: "Register", url: "/register" },
    },
    className,
}: Navbar1Props) => {
    const router = useRouter();
    const { session, setSession, clearSession } = useAuthStore();
    useEffect(() => {
        (async () => {
            const { data } = await getUserSession();
            setSession(data?.session);
        })();
    }, []);
    // console.log(session);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    clearSession();
                    router.replace("/login");
                },
            },
        });
    };
    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
                className,
            )}
        >
            <div className="container mx-auto px-4 md:px-8">
                {/* Using a 3-column grid for desktop to ensure the nav 
                   is perfectly centered relative to the viewport.
                */}
                <div className="flex h-16 items-center justify-between lg:grid lg:grid-cols-3">
                    {/* Column 1: Logo (Left) */}
                    <div className="flex items-center">
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

                    {/* Column 2: Navigation (Center) */}
                    <nav className="hidden justify-center lg:flex">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-1">
                                {menu.map((item) => renderMenuItem(item))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* Column 3: Actions (Right) */}
                    <div className="hidden items-center justify-end gap-3 lg:flex">
                        <ModeToggle />
                        {session ? (
                            <div className="flex items-center gap-2">
                                <Button
                                    asChild
                                    variant="secondary"
                                    className="bg-blue-200 hover:bg-blue-200  text-gray-900"
                                    size="lg"
                                >
                                    <Link href={auth.beTutor.url}>
                                        <GraduationCap className="w-5 h-5" />{" "}
                                        {auth.beTutor.title}
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() => handleLogout()}
                                    variant="destructive"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={auth.login.url}>
                                        {auth.login.title}
                                    </Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link href={auth.signup.url}>
                                        {auth.signup.title}
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile: Toggle + Menu (Visible only on mobile) */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <ModeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9"
                                >
                                    <Menu className="size-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="flex flex-col gap-0 pr-0"
                            >
                                <SheetHeader className="px-6 py-4 border-b">
                                    <SheetTitle className="text-left uppercase">
                                        <Link
                                            href={logo.url}
                                            className="flex items-center gap-2"
                                        >
                                            <img
                                                src={logo.src}
                                                className="h-7 w-auto dark:invert"
                                                alt={logo.alt}
                                            />
                                            <span className="font-bold text-sm">
                                                {logo.title}
                                            </span>
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex-1 overflow-y-auto px-6 py-4">
                                    <div className="flex flex-col gap-4">
                                        {menu.map((item) =>
                                            renderMobileMenuItem(item),
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto border-t p-6 ">
                                    {session ? (
                                        <div className="flex flex-col gap-3">
                                            <Button
                                                asChild
                                                variant="secondary"
                                                className="bg-blue-500 hover:bg-blue-500"
                                                size="lg"
                                            >
                                                <Link href={auth.beTutor.url}>
                                                    <GraduationCap className="w-5 h-5" />{" "}
                                                    {auth.beTutor.title}
                                                </Link>
                                            </Button>
                                            <Button
                                                onClick={() => handleLogout()}
                                                variant="destructive"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                Logout
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="w-full"
                                            >
                                                <Link href={auth.login.url}>
                                                    {auth.login.title}
                                                </Link>
                                            </Button>
                                            <Button asChild className="w-full">
                                                <Link href={auth.signup.url}>
                                                    {auth.signup.title}
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

const renderMenuItem = (item: MenuItem) => {
    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                asChild
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                <Link href={item.url}>{item.title}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    return (
        <Link
            key={item.title}
            href={item.url}
            className="text-md font-semibold"
        >
            {item.title}
        </Link>
    );
};

export { Navbar };
