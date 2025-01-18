import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const selectedRows = table.getSelectedRowModel().rows;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-4">
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="filter-name">Name</Label>
                    <Input
                        id="filter-name"
                        placeholder="Filter by Name..."
                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="filter-surname">Surname</Label>
                    <Input
                        id="filter-surname"
                        placeholder="Filter by Surname..."
                        value={(table.getColumn('surname')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('surname')?.setFilterValue(event.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="filter-email">Email</Label>
                    <Input
                        id="filter-email"
                        placeholder="Filter by Email..."
                        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                    />
                </div>

                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
