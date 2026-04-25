import SlotsPage from "@/components/modules/slots/Slot";
import { bookingService } from "@/service/booking.service";
import { slotService } from "@/service/slots.service";

const Sessions = async () => {
    const { data } = await slotService.getSlots();
    const slots = data.data || [];
    // console.log(slots);

    return (
        <div>
            <SlotsPage data={slots} />
        </div>
    );
};

export default Sessions;
