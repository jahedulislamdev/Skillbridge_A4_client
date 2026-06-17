"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageNumbers } from "@/helper/getPageNumbers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationController {
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}
export function PaginationController({ meta }: PaginationController) {
    const {
        limit: pageSize,
        page: currentPage,
        total: totalTutors,
        totalPage,
    } = meta;
    // console.log(meta);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const navigateToPage = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        router.push(`${pathName}?${params.toString()}`);
    };

    const start = totalTutors === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const end =
        totalTutors === 0 ? 0 : Math.min(currentPage * pageSize, totalTutors);

    return (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            {/* Result Count Section */}
            <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">{start}</span> to{" "}
                <span className="font-medium text-foreground">{end}</span> of{" "}
                <span className="font-medium text-foreground">
                    {totalTutors}
                </span>{" "}
                results
            </div>

            <Pagination className="w-auto mx-0">
                <PaginationContent className="gap-1">
                    {/* Previous Button */}
                    <PaginationItem>
                        <PaginationPrevious
                            className={`h-9 px-3 transition-all hover:bg-secondary ${
                                currentPage <= 1
                                    ? "pointer-events-none opacity-40"
                                    : "cursor-pointer"
                            }`}
                            onClick={() => navigateToPage(currentPage - 1)}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {getPageNumbers(totalPage, currentPage).map((p, idx) => (
                        <PaginationItem key={`${p}-${idx}`}>
                            {p === "ellipsis" ? (
                                <PaginationEllipsis className="text-muted-foreground" />
                            ) : (
                                <PaginationLink
                                    className={`h-9 w-9 cursor-pointer transition-all`}
                                    isActive={currentPage === p}
                                    onClick={() => navigateToPage(p as number)}
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* Next Button */}
                    <PaginationItem>
                        <PaginationNext
                            className={`h-9 px-3 transition-all hover:bg-secondary ${
                                currentPage >= totalPage
                                    ? "pointer-events-none opacity-40"
                                    : "cursor-pointer"
                            }`}
                            onClick={() => navigateToPage(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
