import { PaginationController } from "@/components/layout/Pagination";
import SlotsPage from "@/components/modules/slots/Slot";
import { slotService } from "@/service/slots.service";

const Sessions = async ({
    searchParams,
}: {
    searchParams: Promise<{
        search: string;
        page: string;
        limit: string;
    }>;
}) => {
    const { page, limit, search } = await searchParams;
    const { data } = await slotService.getSlots(
        { page, limit, search },
        { revalidate: 60 },
    );
    // console.log(data);

    const slots = data?.data.slots || [];
    // console.log(slots);
    const pagination = data?.data.meta || {
        limit: 10,
        page: 1,
        totalPage: 0,
        total: 0,
    };
    return (
        <div>
            <SlotsPage data={slots} />
            <div className="max-w-6xl mx-auto p-4">
                <PaginationController meta={pagination} />
            </div>
        </div>
    );
};

export default Sessions;
