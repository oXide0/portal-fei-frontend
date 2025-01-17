interface UsePaginationProps {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export const usePagination = ({ currentPage, totalPages, setPage }: UsePaginationProps) => {
    const goToNextPage = () => {
        if (currentPage < totalPages) setPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setPage(currentPage - 1);
    };

    return { goToNextPage, goToPreviousPage };
};
