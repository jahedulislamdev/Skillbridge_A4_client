export const getPageNumbers = (totalPage: number, currentPage: number) => {
    const pages = [];
    const showMax = 3;

    if (totalPage <= 5) {
        for (let i = 1; i <= totalPage; i++) pages.push(i);
    } else {
        pages.push(1);
        if (currentPage > showMax) pages.push("ellipsis");

        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPage - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            if (!pages.includes(i)) pages.push(i);
        }

        if (currentPage < totalPage - (showMax - 1)) pages.push("ellipsis");
        if (!pages.includes(totalPage)) pages.push(totalPage);
    }
    return pages;
};
