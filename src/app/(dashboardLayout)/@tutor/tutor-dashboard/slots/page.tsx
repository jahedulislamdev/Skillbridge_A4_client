import { SlotProps, slotService } from "@/service/slots.service";
import { userService } from "@/service/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock } from "lucide-react";
import { format } from "date-fns";
import SlotForm from "@/components/modules/slots/SlotForm";
import DeleteDialouge from "@/components/modules/slots/DeleteDialouge";
import { SlotCard as slot } from "@/types/slotCard";

const Slots = async () => {
    const { data: session } = await userService.getSession();
    const user = session?.user;

    // Fetch tutor profile to get the specific tutorId
    const tutorResponse = await userService.getUserById(user.id);
    const tutorProfileId = tutorResponse?.data?.tutorProfile?.id;

    const slotsResponse = await slotService.getSlotsByTutorId(tutorProfileId);
    const slots = slotsResponse?.data || [];
    //  console.log(slots);

    return (
        <div className="container max-w-5xl py-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Availability Slots
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Manage your weekly recurring teaching schedule.
                    </p>
                </div>
                {/* Button for future functionality */}
                <SlotForm tutorId={tutorProfileId} />
                {/* <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Create New Slot
                </Button> */}
            </div>

            <Separator />

            {slots.length === 0 ? (
                <Card className="border-dashed bg-muted/20">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-muted p-4 mb-4">
                            <CalendarDays className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">
                            No slots created
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            You haven't set up any availability yet. Add slots
                            to allow students to book sessions.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {slots.map((slot: slot) => (
                        <SlotCard key={slot.id} slot={slot} />
                    ))}
                </div>
            )}
        </div>
    );
};

function SlotCard({ slot }: { slot: slot }) {
    // Formats 1970-01-01T07:00:00.000Z to "07:00 AM"
    const formatTime = (timeStr: string) => {
        try {
            return format(new Date(timeStr), "hh:mm b");
        } catch (e) {
            return "Invalid Time";
        }
    };

    return (
        <Card className="transition-all hover:shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-bold text-primary">
                        {slot.dayOfWeek}
                    </CardTitle>
                    <Badge
                        variant={slot.isBooked ? "secondary" : "outline"}
                        className={
                            slot.isBooked ? "" : "bg-green-500 text-white"
                        }
                    >
                        {slot.isBooked ? "Booked" : "Available"}
                    </Badge>
                </div>
                <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span>{formatTime(slot.startTime)}</span>
                    <span className="text-muted-foreground">—</span>
                    <span>{formatTime(slot.endTime)}</span>
                </div>
                <p className="mt-4 text-[11px] text-muted-foreground font-mono">
                    ID: {slot.id.slice(0, 8)}...
                </p>
                {!slot.isBooked && (
                    <div className="grid place-content-end">
                        <DeleteDialouge slotId={slot.id} />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default Slots;
