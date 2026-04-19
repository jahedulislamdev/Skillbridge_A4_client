import { Navbar } from "@/components/layout/navbar1";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-28">{children}</div>
        </div>
    );
};

export default layout;
