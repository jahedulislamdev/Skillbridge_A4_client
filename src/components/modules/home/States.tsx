import { Users, Video, Box, Book } from "lucide-react";

const StatsSection = ({ stats }: any) => {
    // console.log(stats);

    const { slots, subjects, users } = stats.data;
    // Default data structure based on your image
    const statItems = [
        {
            label: "Registered Tutors",
            value: users?.tutors || 0,
            icon: Users,
            color: "text-blue-500",
        },
        {
            label: "Total Subjects",
            value: subjects?.total || 0,
            icon: Book,
            color: "text-emerald-500",
        },
        {
            label: "Live Tuition Jobs",
            value: slots?.available || 0,
            icon: Video,
            color: "text-orange-500",
        },
        {
            label: "Total Stakeholders",
            value: users?.total || 0,
            icon: Box,
            color: "text-purple-500",
        },
    ];

    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {statItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border border-primary/5 bg-card p-8 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                        >
                            <div className="relative z-10 flex flex-col space-y-4">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 ${item.color}`}
                                >
                                    <item.icon className="h-6 w-6" />
                                </div>

                                <div>
                                    <h3 className="text-3xl font-black tracking-tight text-foreground">
                                        {item.value.toLocaleString()}
                                    </h3>
                                    <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground/70">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
