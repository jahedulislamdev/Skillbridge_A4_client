import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar1";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="md:px-10 lg:px-20">{children}</div>
            <Footer />
            <Toaster richColors position="top-right" />
        </div>
    );
};

export default layout;
