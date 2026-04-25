import Link from "next/link";
import { FaFacebook, FaWhatsapp, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background text-foreground">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Column 1: Brand */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <h2 className="text-xl font-bold tracking-tight">
                            SKILLBRIDGE
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A professional platform connecting students with
                            expert tutors for personalized, high-impact
                            learning.
                        </p>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <a
                                href="https://www.facebook.com/jahedulislam.jishan.9"
                                target="_blank"
                                className="hover:text-primary transition-colors"
                            >
                                <FaFacebook size={20} />
                            </a>
                            <a
                                href="https://wa.me/01831303692"
                                target="_blank"
                                className="hover:text-primary transition-colors"
                            >
                                <FaWhatsapp size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/jahedulislamdev/"
                                target="_blank"
                                className="hover:text-primary transition-colors"
                            >
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            Platform
                        </h3>
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/tutors"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Find a Tutor
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                How it Works
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Support Center
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3: Legal */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            Legal
                        </h3>
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/privacy"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/refund"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Refund Policy
                            </Link>
                        </nav>
                    </div>

                    {/* Column 4: Status/Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            System Status
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="flex h-2 w-2 rounded-full bg-green-500" />
                            <span>Systems Operational</span>
                        </div>
                        <Link
                            href="mailto:support@skillbridge.com"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <FaEnvelope />
                            <span>support@skillbridge.com</span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-muted-foreground">
                    <p>© {currentYear} SKILLBRIDGE. All rights reserved.</p>

                    <div className="flex items-center gap-1">
                        <span>Built by</span>
                        <Link
                            href="https://jahedulislam.dev"
                            target="_blank"
                            className="font-medium text-foreground hover:underline underline-offset-4"
                        >
                            jahedulislam.dev
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
