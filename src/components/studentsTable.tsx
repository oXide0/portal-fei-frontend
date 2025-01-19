import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Student } from '@/types/skex/Student';
import { useEffect, useState } from 'react';
import { TableToolbar } from './tableToolbar';
import { TablePagination } from './tablePagination';

interface StudentsTableProps {
    data: Student[];
    values: {
        name: string;
        surname: string;
        email: string;
    };
    onChange: (values: { name: string; surname: string; email: string }) => void;
    onReset: () => void;
    onSubmit: (selectedStudentMails: string[]) => Promise<void>;
}

export function StudentsTable(props: StudentsTableProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const totalPages = Math.ceil(props.data.length / 10); // 10 is the number of rows per page
    const selectedRowsCount = Object.values(rowSelection).filter(Boolean).length;

    const isAllSelected =
        Object.values(rowSelection).filter((value) => value).length === props.data.length && props.data.length > 0;

    useEffect(() => {
        setRowSelection(
            props.data.reduce(
                (acc, student) => {
                    acc[student.email] = student.isAssigned;
                    return acc;
                },
                {} as Record<string, boolean>,
            ),
        );
    }, [props.data]);

    return (
        <div className="space-y-4">
            <TableToolbar
                values={props.values}
                onChange={props.onChange}
                onReset={props.onReset}
                onSave={() => {
                    const selectedStudents = Object.entries(rowSelection)
                        .filter(([, isSelected]) => isSelected)
                        .map(([email]) => email);
                    props.onSubmit(selectedStudents);
                }}
            />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheckedChange={(value) => {
                                        const newSelection = props.data.reduce(
                                            (acc, student) => {
                                                acc[student.email] = !!value;
                                                return acc;
                                            },
                                            {} as Record<string, boolean>,
                                        );
                                        setRowSelection(newSelection);
                                    }}
                                    aria-label="Vybrať všetkých"
                                />
                            </TableHead>
                            <TableHead>Študent</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Študijný program</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.data.length ? (
                            props.data.map((student) => (
                                <TableRow
                                    key={student.email}
                                    className={rowSelection[student.email] ? 'bg-gray-100' : ''}
                                >
                                    <TableCell className="w-12">
                                        <Checkbox
                                            checked={rowSelection[student.email] ?? false}
                                            onCheckedChange={(value) => {
                                                setRowSelection((prev) => ({
                                                    ...prev,
                                                    [student.email]: !!value,
                                                }));
                                            }}
                                            aria-label={`Vybrať ${student.name} ${student.surname}`}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <span className="truncate font-medium">
                                                {student.name} {student.surname}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="w-[80px] truncate">{student.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <span className="truncate font-medium">{student.studyProgram}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    Žiadne výsledky.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between px-2">
                <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
                    {selectedRowsCount} z {props.data.length} riadkov vybraných.
                </div>
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
