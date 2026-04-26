"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const UserSearchBox = ({ search }: { search: string }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search users by name or email"
                    className="pl-9"
                />
            </div>
            <Button variant="outline">Filters</Button>
        </div>
    );
};

export default UserSearchBox;
