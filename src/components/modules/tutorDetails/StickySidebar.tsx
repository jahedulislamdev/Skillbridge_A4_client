import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TutorDetail } from "@/types/tutorDetails";
import { Check, MessageSquare } from "lucide-react";
import Link from "next/link";

const StickySidebar = ({ tutor }: { tutor: TutorDetail }) => {
    return (
        <div className="lg:col-span-4">
            <aside className="sticky top-28 space-y-6">
                <Card className="shadow-2xl border-primary/10 overflow-hidden">
                    <div className="p-8 bg-muted/40 border-b flex justify-between items-center">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                Hourly Rate
                            </p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold">
                                    ৳{tutor.hourlyRate}
                                </span>
                                <span className="text-muted-foreground font-medium">
                                    /hr
                                </span>
                            </div>
                        </div>
                        <Badge
                            variant="secondary"
                            className="h-10 px-4 rounded-full font-bold"
                        >
                            Save 10%
                        </Badge>
                    </div>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Check className="w-4 h-4" />
                                </div>
                                <span>Pay after each lesson</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                <span>Direct chat with tutor</span>
                            </div>
                        </div>
                        <Link href={"/sessions"}>
                            <Button className="w-full cursor-pointer h-14 text-md font-bold shadow-xl shadow-primary/20">
                                Book a Session
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="w-full mt-3 h-12 font-semibold"
                        >
                            Inquiry via Message
                        </Button>

                        <p className="text-[11px] text-center text-muted-foreground leading-relaxed px-4">
                            Our platform handles security and session tracking.
                            Cancel for free 24 hours in advance.
                        </p>
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
};

export default StickySidebar;
