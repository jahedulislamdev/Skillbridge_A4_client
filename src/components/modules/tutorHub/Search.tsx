"use client";

import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBox = ({ placeholder }: { placeholder: string }) => {
    const searchParams = useSearchParams();
    const pathname = searchParams.toString();

    const [value, setValue] = useState(searchParams.get("search") || "");
    const [isSearching, setIsSearching] = useState(false);

    const router = useRouter();

    const handleSearch = () => {
        setIsSearching(true);

        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set("search", value.trim());
            params.set("page", "1");
        } else {
            params.delete("search");
        }

        router.push(`?${params.toString()}`, {
            scroll: false,
        });
    };

    useEffect(() => {
        setIsSearching(false);
    }, [pathname]);

    return (
        <div className="flex justify-between items-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
                className="relative w-full sm:max-w-sm"
            >
                {isSearching ? (
                    <Loader2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                )}

                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="pl-10 h-10 rounded-xl bg-card"
                />
            </form>
        </div>
    );
};

export default SearchBox;
