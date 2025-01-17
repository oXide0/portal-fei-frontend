import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<any>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'title',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue('title')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue('status'));

            if (!status) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{status.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'priority',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
        cell: ({ row }) => {
            const priority = priorities.find((priority) => priority.value === row.getValue('priority'));

            if (!priority) {
                return null;
            }

            return (
                <div className="flex items-center">
                    {priority.icon && <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{priority.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: 'actions',
        cell: () => <DataTableRowActions />,
    },
];

import { AlertCircle, Circle, Timer, CheckCircle, XCircle, ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';

export const statuses = [
    {
        value: 'backlog',
        label: 'Backlog',
        icon: AlertCircle, // Equivalent to IconExclamationCircle
    },
    {
        value: 'todo',
        label: 'Todo',
        icon: Circle, // Equivalent to IconCircle
    },
    {
        value: 'in progress',
        label: 'In Progress',
        icon: Timer, // Equivalent to IconStopwatch
    },
    {
        value: 'done',
        label: 'Done',
        icon: CheckCircle, // Equivalent to IconCircleCheck
    },
    {
        value: 'canceled',
        label: 'Canceled',
        icon: XCircle, // Equivalent to IconCircleX
    },
];

export const priorities = [
    {
        label: 'Low',
        value: 'low',
        icon: ArrowDown, // Equivalent to IconArrowDown
    },
    {
        label: 'Medium',
        value: 'medium',
        icon: ArrowRight, // Equivalent to IconArrowRight
    },
    {
        label: 'High',
        value: 'high',
        icon: ArrowUp, // Equivalent to IconArrowUp
    },
];
