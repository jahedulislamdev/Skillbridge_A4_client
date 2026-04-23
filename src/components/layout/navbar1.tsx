"use client";
import { Menu } from "lucide-react";
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
import { ModeToggle } from "../Modetoggle";
import { useEffect, useState } from "react";
import { getUserSession } from "@/actions/user.actions";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
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
        logout: {
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
        src: "https://i.pinimg.com/736x/0f/f1/aa/0ff1aaf838df1a77c702071b5eb2eedf.jpg",
        alt: "logo",
        title: "skillbridge",
    },
    menu = [
        { title: "Home", url: "/" },
        {
            title: "Tutors",
            url: "/tutors",
        },
        {
            title: "Dashboard",
            url: "/dashboard",
        },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        logout: { title: "Logout", url: "/login" },
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
    console.log(session);

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
                                className="h-8 w-auto dark:invert"
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
                            <Button
                                onClick={() => handleLogout()}
                                variant="destructive"
                            >
                                Logout
                            </Button>
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
                                    <SheetTitle className="text-left">
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

                                <div className="mt-auto border-t p-6 flex flex-col gap-3">
                                    <Button>Logout</Button>
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
