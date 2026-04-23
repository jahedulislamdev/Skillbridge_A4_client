import Link from "next/link";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-6 py-10">
                {/* TOP */}
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    {/* Brand */}
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold tracking-tight">
                            SKILLBRIDGE
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Empowering learners with expert guidance and
                            personalized education.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        <Link
                            href="#"
                            className="hover:text-foreground transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-foreground transition-colors"
                        >
                            booking policy
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-foreground transition-colors"
                        >
                            Refund policy
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-foreground transition-colors"
                        >
                            privacy policy
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-foreground transition-colors"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <Link
                            href="#"
                            className="hover:text-foreground transition-colors"
                        >
                            <FaFacebook size={23} />
                        </Link>
                        <Link
                            href=""
                            className="hover:text-foreground transition-colors"
                        >
                            <FaWhatsapp size={24} />
                        </Link>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="mt-10 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
                    {/* Copyright */}
                    <p>
                        © {new Date().getFullYear()} SKILLBRIDGE. All rights
                        reserved.
                    </p>

                    {/* Developer + Status */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1">
                            <span>Developed by</span>
                            <Link
                                href="https://jahedulislam.dev"
                                target="_blank"
                                className="font-medium text-foreground hover:underline underline-offset-4"
                            >
                                jahedulislam.dev
                            </Link>
                        </div>

                        <div className="hidden sm:block h-4 w-px bg-border" />

                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            <span>All systems operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
