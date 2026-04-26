"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBox = ({ placeholder }: { placeholder: string }) => {
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") || "");
    //  console.log(searchParams.get("search"));
    const router = useRouter();
    const handleSearch = () => {
        const params = new URLSearchParams();
        if (value.trim()) {
            params.set("search", value.trim());
            params.set("page", "1"); // reset page on new search
        } else {
            params.delete("search");
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex justify-between items-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
                className="relative w-full sm:max-w-sm"
            >
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    name="query"
                    placeholder={placeholder}
                    className="pl-10 h-10 rounded-xl bg-card"
                />
            </form>
        </div>
    );
};

export default SearchBox;
