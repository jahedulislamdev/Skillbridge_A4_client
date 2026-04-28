import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        PENDING:
            "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
        COMPLETED:
            "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
        CANCELLED: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
    };

    return (
        <Badge variant="outline" className={styles[status] || ""}>
            {status}
        </Badge>
    );
};
