import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function TablePagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex items-center gap-10">
            <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
                Page {currentPage + 1} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => onPageChange(0)}
                    disabled={currentPage === 0}
                >
                    <span className="sr-only">Go to first page</span>
                    <DoubleArrowLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => onPageChange(totalPages - 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    <span className="sr-only">Go to last page</span>
                    <DoubleArrowRightIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
