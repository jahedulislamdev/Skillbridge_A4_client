import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/provider/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import UserProvider from "./provider/UserProvider";
import ScrollToTop from "@/helper/scrollToTop";
import { Suspense } from "react";

const geistSans = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Skillbridge - Find Your Perfect Tutor",
        template: "%s | SkillBridge",
    },
    description:
        "Find expert tutors, book sessions, and improve your learning with SkillBridge.",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
    openGraph: {
        title: "SkillBridge",
        description: "Book expert tutors online.",
        url: "https://skillbridge-client-nine.vercel.app",
        siteName: "SkillBridge",
        images: [
            {
                url: "/logo-withbg.png",
                width: 1200,
                height: 630,
                alt: "SkillBridge",
            },
        ],
        type: "website",
    },
    keywords: [
        "SkillBridge",
        "Tutors",
        "Online Learning",
        "Education",
        "Booking",
    ],
    authors: [
        {
            name: "Jahedul Islam Jishan",
            url: "https://github.com/jahedulislamdev",
        },
    ],
    creator: "SkillBridge",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        <UserProvider>
                            <Suspense fallback={null}>
                                <ScrollToTop />
                            </Suspense>
                            {children}
                        </UserProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
