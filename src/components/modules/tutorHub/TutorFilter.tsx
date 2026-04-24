"use client";

import * as React from "react";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// ✅ shadcn/ui components
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ✅ utils
import { cn } from "@/lib/utils";

// ✅ icons
import { Star, Check, Loader2, SlidersHorizontal } from "lucide-react";

// ─── Constants ─────────────────────────────────────────────

const MIN_PRICE = 100;
const MAX_PRICE = 800;
const DEFAULT_RANGE: [number, number] = [MIN_PRICE, MAX_PRICE];

const STAR_LABELS: Record<number, string> = {
    5: "5.0 only",
    4: "4.0 & up",
    3: "3.0 & up",
};

const PRICE_PRESETS = [
    {
        label: "Budget",
        sublabel: "৳250-300",
        range: [250, 300] as [number, number],
    },
    {
        label: "Mid-range",
        sublabel: "৳400-500",
        range: [400, 500] as [number, number],
    },
    {
        label: "Premium",
        sublabel: "৳550-650",
        range: [550, 650] as [number, number],
    },
];

// ─── Hook ─────────────────────────────────────────────────

function useFilterState() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [rating, setRating] = useState<number | null>(
        Number(searchParams.get("rating")) || null,
    );
    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(searchParams.get("priceMin")) || MIN_PRICE,
        Number(searchParams.get("priceMax")) || MAX_PRICE,
    ]);
    const [activePreset, setActivePreset] = useState<string | null>(null);

    const isDirty =
        rating !== (Number(searchParams.get("rating")) || null) ||
        priceRange[0] !== (Number(searchParams.get("priceMin")) || MIN_PRICE) ||
        priceRange[1] !== (Number(searchParams.get("priceMax")) || MAX_PRICE);

    const hasFilters =
        rating !== null ||
        priceRange[0] !== MIN_PRICE ||
        priceRange[1] !== MAX_PRICE;
    const activeCount =
        (rating ? 1 : 0) +
        (priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE ? 1 : 0);

    const handleApply = () => {
        const params = new URLSearchParams();
        searchParams.forEach((val, key) => {
            if (!["rating", "priceMin", "priceMax", "page"].includes(key)) {
                params.set(key, val);
            }
        });

        if (rating) params.set("rating", String(rating));
        if (priceRange[0] !== MIN_PRICE)
            params.set("priceMin", String(priceRange[0]));
        if (priceRange[1] !== MAX_PRICE)
            params.set("priceMax", String(priceRange[1]));
        params.set("page", "1");

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    const handleRatingClick = (value: number) => {
        setRating((prev) => (prev === value ? null : value));
    };

    const handlePriceChange = (values: number[]) => {
        setPriceRange([values[0], values[1]]);
        setActivePreset(null);
    };

    const handlePreset = (preset: (typeof PRICE_PRESETS)[number]) => {
        const isActive = activePreset === preset.label;
        setActivePreset(isActive ? null : preset.label);
        setPriceRange(isActive ? DEFAULT_RANGE : preset.range);
    };

    const handleReset = () => {
        setRating(null);
        setPriceRange(DEFAULT_RANGE);
        setActivePreset(null);
        startTransition(() => router.push(pathname, { scroll: false }));
    };

    return {
        rating,
        priceRange,
        activePreset,
        isPending,
        isDirty,
        hasFilters,
        activeCount,
        handleRatingClick,
        handlePriceChange,
        handlePreset,
        handleApply,
        handleReset,
    };
}

// ─── Star Row ─────────────────────────────────────────────

function StarRow({
    value,
    selected,
    onClick,
}: {
    value: number;
    selected: boolean;
    onClick: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const active = selected || hovered;

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all duration-150 cursor-pointer",
                selected
                    ? "bg-amber-50 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700"
                    : "border-transparent hover:bg-muted",
            )}
        >
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={cn(
                            "transition-all duration-100",
                            i < value
                                ? active
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-amber-300 text-amber-300"
                                : "fill-muted text-muted-foreground opacity-40",
                        )}
                    />
                ))}
            </div>

            <div className="flex items-center gap-2">
                <span
                    className={cn(
                        "text-xs font-medium transition-colors",
                        selected
                            ? "text-amber-700 dark:text-amber-400"
                            : "text-muted-foreground",
                    )}
                >
                    {STAR_LABELS[value]}
                </span>

                <div
                    className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0",
                        selected
                            ? "bg-amber-400 border-amber-400"
                            : "border-border",
                    )}
                >
                    {selected && (
                        <Check
                            size={9}
                            className="text-white"
                            strokeWidth={3}
                        />
                    )}
                </div>
            </div>
        </button>
    );
}

// ─── Main Component ───────────────────────────────────────

export function TutorFilters({ className }: { className?: string }) {
    const {
        rating,
        priceRange,
        activePreset,
        isPending,
        isDirty,
        hasFilters,
        activeCount,
        handleRatingClick,
        handlePriceChange,
        handlePreset,
        handleApply,
        handleReset,
    } = useFilterState();

    const priceLabel =
        priceRange[1] >= MAX_PRICE
            ? `৳${priceRange[0]} – ৳800+`
            : `৳${priceRange[0]} – ৳${priceRange[1]}`;

    return (
        <div
            className={cn(
                "w-72 rounded-2xl border bg-card shadow-sm overflow-hidden",
                className,
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal
                        size={14}
                        className="text-muted-foreground"
                        strokeWidth={2}
                    />
                    <span className="text-sm font-semibold">Filters</span>
                    {hasFilters && (
                        <Badge
                            variant="secondary"
                            className="h-5 px-1.5 text-[10px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-0 rounded-full"
                        >
                            {activeCount} active
                        </Badge>
                    )}
                </div>
                {hasFilters && (
                    <button
                        onClick={handleReset}
                        className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-medium"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <Separator />

            {/* Rating */}
            <div className="px-3 py-3.5 space-y-1">
                <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Rating
                    </span>
                    {rating && (
                        <button
                            onClick={() => handleRatingClick(rating)}
                            className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {[5, 4, 3].map((v) => (
                    <StarRow
                        key={v}
                        value={v}
                        selected={rating === v}
                        onClick={() => handleRatingClick(v)}
                    />
                ))}

                <div
                    className={cn(
                        "px-1 text-[10px] text-muted-foreground transition-all duration-200 overflow-hidden",
                        rating
                            ? "mt-2 max-h-8 opacity-100"
                            : "max-h-0 opacity-0",
                    )}
                >
                    {rating && (
                        <>
                            Showing tutors rated{" "}
                            <span className="font-semibold text-amber-600 dark:text-amber-400">
                                {rating}.0{rating < 5 ? "+" : ""}
                            </span>{" "}
                            stars
                        </>
                    )}
                </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="px-3 py-3.5 space-y-3">
                <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Price / hour
                    </span>
                    <span className="text-xs font-semibold bg-muted rounded-lg px-2.5 py-1 tabular-nums">
                        {priceLabel}
                    </span>
                </div>

                <div className="flex gap-1.5 flex-wrap">
                    {PRICE_PRESETS.map((preset) => (
                        <button
                            key={preset.label}
                            onClick={() => handlePreset(preset)}
                            className={cn(
                                "flex flex-col items-start px-2.5 py-1.5 rounded-xl border text-left transition-all duration-150",
                                activePreset === preset.label
                                    ? "bg-foreground text-background border-foreground shadow-md"
                                    : "bg-transparent border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                            )}
                        >
                            <span className="text-[11px] font-semibold leading-none mb-0.5">
                                {preset.label}
                            </span>
                            <span
                                className={cn(
                                    "text-[9px] leading-none",
                                    activePreset === preset.label
                                        ? "text-background/70"
                                        : "text-muted-foreground/70",
                                )}
                            >
                                {preset.sublabel}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="px-1 pt-2">
                    <Slider
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={25}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className={cn(
                            "[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-foreground",
                            "[&_[role=slider]]:bg-background [&_[role=slider]]:shadow-sm [&_[role=slider]]:transition-colors",
                            "[&_[role=slider]]:focus-visible:ring-2 [&_[role=slider]]:focus-visible:ring-amber-400 [&_[role=slider]]:focus-visible:ring-offset-0",
                            "[&_.range-slider-range]:bg-amber-400",
                        )}
                    />
                </div>
                <div className="flex justify-between px-1">
                    <span className="text-[10px] text-muted-foreground">
                        ৳100
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                        ৳800+/hr
                    </span>
                </div>
            </div>

            <Separator />

            {/* Apply */}
            <div className="px-3 py-3.5">
                <Button
                    onClick={handleApply}
                    disabled={isPending || !isDirty}
                    className={cn(
                        "w-full h-10 rounded-xl text-sm font-semibold transition-all",
                        "bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50",
                    )}
                >
                    {isPending ? (
                        <Loader2 size={15} className="animate-spin" />
                    ) : (
                        <span className="flex items-center gap-2">
                            Apply filters
                            {hasFilters && (
                                <span className="w-5 h-5 rounded-full bg-amber-400 text-foreground text-[10px] font-bold flex items-center justify-center">
                                    {activeCount}
                                </span>
                            )}
                        </span>
                    )}
                </Button>
            </div>
        </div>
    );
}
