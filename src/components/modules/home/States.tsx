import { Users, Video, Box, Book } from "lucide-react";

const StatsSection = ({ stats }: any) => {
    const { slots, subjects, users } = stats?.data || {};

    const statItems = [
        {
            label: "Registered Tutors",
            value: users?.tutors || 0,
            icon: Users,
            color: "from-blue-500 to-cyan-400",
            lightColor: "bg-blue-500/10",
        },
        {
            label: "Total Subjects",
            value: subjects?.total || 0,
            icon: Book,
            color: "from-emerald-500 to-teal-400",
            lightColor: "bg-emerald-500/10",
        },
        {
            label: "Live Tuition Jobs",
            value: slots?.available || 0,
            icon: Video,
            color: "from-orange-500 to-amber-400",
            lightColor: "bg-orange-500/10",
        },
        {
            label: "Total Stakeholders",
            value: users?.total || 0,
            icon: Box,
            color: "from-purple-500 to-indigo-400",
            lightColor: "bg-purple-500/10",
        },
    ];

    return (
        <section className="relative py-20 overflow-hidden bg-background">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {statItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center text-center p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
                        >
                            {/* Icon Container with Gradient Border Effect */}
                            <div
                                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.lightColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                            >
                                <item.icon
                                    className={`h-8 w-8 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}
                                    style={{
                                        color: "transparent",
                                        backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                                    }}
                                />
                                {/* Fallback for browsers struggling with text-clip on icons */}
                                <item.icon
                                    className={`absolute h-8 w-8 opacity-70 ${item.color.split(" ")[0].replace("from-", "text-")}`}
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-4xl font-bold tracking-tight text-foreground">
                                    <span className="inline-block transition-all duration-300 group-hover:scale-105">
                                        {item.value.toLocaleString()}
                                    </span>
                                    <span className="text-primary ml-0.5">
                                        +
                                    </span>
                                </h3>
                                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground/80">
                                    {item.label}
                                </p>
                            </div>

                            {/* Bottom Accent Line */}
                            <div
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r ${item.color} transition-all duration-500 group-hover:w-1/3 rounded-t-full`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
