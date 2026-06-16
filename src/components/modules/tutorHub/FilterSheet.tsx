"use client";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Filter } from "lucide-react";
import { TutorFilters } from "./TutorFilter";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function FilterSheet() {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setOpen(false);
    }, [searchParams.toString()]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full gap-2 border-dashed"
                >
                    <Filter size={16} />
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 p-0 overflow-y-auto">
                <VisuallyHidden.Root>
                    <SheetTitle>Tutor Filters</SheetTitle>
                </VisuallyHidden.Root>
                <TutorFilters />
            </SheetContent>
        </Sheet>
    );
}
