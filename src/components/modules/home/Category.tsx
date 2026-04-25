import {
    Sparkles,
    Languages,
    Code2,
    ChevronRight,
    ArrowRight,
    Book,
    Laptop,
    Clapperboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
    {
        label: "Al Quran",
        description:
            "Master the art of fashion design and garment construction.",
        icon: Book,
        color: "bg-blue-500/10 text-blue-600",
    },
    {
        label: "Formal Education",
        description:
            "Professional techniques for bridal, editorial, and everyday looks.",
        icon: Sparkles,
        color: "bg-pink-500/10 text-pink-600",
    },
    {
        label: "IELTS",
        description: "Immersive 1-on-1 sessions to reach fluency faster.",
        icon: Languages,
        color: "bg-indigo-500/10 text-indigo-600",
    },
    {
        label: "Video Editing",
        description: "Visual storytelling through modern digital tools.",
        icon: Clapperboard,
        color: "bg-orange-500/10 text-orange-600",
    },
    {
        label: "Basic Computer",
        description: "Learn sound engineering and composition from pros.",
        icon: Laptop,
        color: "bg-emerald-500/10 text-emerald-600",
    },
    {
        label: "Software Dev",
        description: "Full-stack mentorship for modern engineers.",
        icon: Code2,
        color: "bg-cyan-500/10 text-cyan-600",
    },
];

const CategorySection = () => {
    return (
        <section className=" md:py-24 py-16 bg-background">
            <div className="container mx-auto px-6">
                {/* Header Area */}
                <div className="mb-16 flex flex-col items-end justify-between gap-6 border-l-4 border-primary pl-6 md:flex-row md:items-center">
                    <div className="space-y-2">
                        <h2 className="text-lg md:text-xl lg:text-4xl font-black tracking-tighter text-foreground sm:text-5xl uppercase">
                            Service{" "}
                            <span className="text-primary/60">Categories</span>
                        </h2>
                        <p className="text-muted-foreground text-sm md:font-medium">
                            Choose your path. Targeted learning with top
                            Instractors.
                        </p>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="group relative flex items-start gap-5 overflow-hidden rounded-3xl border border-primary/5 bg-card p-8 transition-all hover:border-primary/20 hover:bg-secondary/30"
                        >
                            {/* Icon Wrapper */}
                            <div
                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.color} transition-transform duration-500 group-hover:scale-110`}
                            >
                                <item.icon className="h-7 w-7" />
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold tracking-tight text-foreground">
                                    {item.label}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {item.description}
                                </p>
                                <div className="pt-2">
                                    {/* <button className="flex items-center text-xs font-bold uppercase tracking-widest text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                                        Explore Path{" "}
                                        <ArrowRight className="ml-2 h-3 w-3" />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
