import SlotsPage from "@/components/modules/slots/Slot";
import { slotService } from "@/service/slots.service";

const Sessions = async () => {
    const { data } = await slotService.getSlots();
    const slots = data?.data || [];
    return (
        <div>
            <SlotsPage data={slots} />
        </div>
    );
};

export default Sessions;
