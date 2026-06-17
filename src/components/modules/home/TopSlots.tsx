import { slotService } from "@/service/slots.service";
import { AvailabilitySlot } from "@/types/tutorDetails";

const TopSlots = async () => {
    const { data } = await slotService.getSlots();
    const slots = data?.data.slots || [];
    return (
        <div>
            {slots.map((slot: AvailabilitySlot) => (
                <div key={slot.id}>{slot.id}</div>
            ))}
        </div>
    );
};

export default TopSlots;
