import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAvailableSubjectStatusOptions, prettifySubjectStatus, prettifyTableStatus } from '../../helpers';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useRequiredParam } from '../../hooks/useRequiredParam';
import {
    useAddSubjectForTableMutation,
    useDeleteSubjectForTableMutation,
    useEvaluateSubjectMutation,
} from '../../services/isp/subject';
import { useEvaluateTableMutation, useGetTableQuery } from '../../services/isp/table';
import { SubjectStatus } from '../../types/isp/Subject';
import { TableStatus } from '../../types/isp/Table';

const SubjectsTablePage = () => {
    const tableId = useRequiredParam('tableId');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { role } = useAppSelector((state) => state.user);
    const isStudent = role === 'S';

    const { data, isLoading, refetch } = useGetTableQuery(tableId);
    const [evaluateTable] = useEvaluateTableMutation();
    const [evaluateSubject] = useEvaluateSubjectMutation();
    const [addSubject] = useAddSubjectForTableMutation();
    const [deleteSubject] = useDeleteSubjectForTableMutation();

    const handleDeleteSubject = async (subjectId: string) => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
            await deleteSubject(subjectId);
            refetch();
        }
    };

    const handleChangeSubjectStatus = async (subjectId: string, newStatus: SubjectStatus) => {
        try {
            await evaluateSubject({ subjectId, subjectStatus: newStatus });
        } catch (error) {
            alert('Nepodarilo sa aktualizovať stav predmetu');
        }
        refetch();
    };

    const handleChangeTableStatus = async (newStatus: TableStatus) => {
        try {
            await evaluateTable({
                tableId,
                tableStatus: newStatus,
            });
        } catch (error) {
            alert('Failed to update table status');
        }
    };

    if (isLoading || !data) return <Skeleton />;

    return (
        <div className="p-4">
            <Breadcrumb style={{ paddingBottom: '20px' }}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Kategórie</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/isp/requests">ISP Žiadosti</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Tabuľka Predmetov</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold mb-4">Tabuľka Predmetov</h1>

            <div className="mb-6">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">Status Tabuľky:</h2>
                    <h2
                        className={`text-xl font-semibold ${
                            data.tableStatus === 'APPROVED'
                                ? 'text-green-500'
                                : data.tableStatus === 'DECLINED'
                                  ? 'text-red-500'
                                  : 'text-yellow-500'
                        }`}
                    >
                        {prettifyTableStatus(data.tableStatus)}
                    </h2>
                </div>
                {!isStudent && data.tableStatus === 'PENDING' && (
                    <div className="mt-4 flex gap-3">
                        <Button
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleChangeTableStatus('APPROVED')}
                        >
                            Schváliť Tabuľku
                        </Button>
                        <Button
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleChangeTableStatus('DECLINED')}
                        >
                            Zamietnuť Tabuľku
                        </Button>
                    </div>
                )}
            </div>

            {!isStudent && (
                <div className="mb-4">
                    <Button onClick={() => setIsModalOpen(true)}>Pridať Predmet</Button>
                </div>
            )}

            <div className="overflow-x-auto max-w-5xl">
                <Table>
                    <TableCaption>Tabuľka Predmetov</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Názov Predmetu</TableHead>
                            <TableHead>Stav</TableHead>
                            {!isStudent && <TableHead>Akcie</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.subjects.map((subject) => (
                            <TableRow key={subject.subjectId} className="border">
                                <TableCell className="py-2 px-4 border">{subject.name}</TableCell>
                                <TableCell className="py-2 px-4 border">
                                    {isStudent ? (
                                        <p className="font-bold">{prettifySubjectStatus(subject.subjectStatus)}</p>
                                    ) : subject.subjectStatus === 'PENDING' ? (
                                        <Select
                                            defaultValue={subject.subjectStatus}
                                            onValueChange={(value) =>
                                                handleChangeSubjectStatus(subject.subjectId, value as SubjectStatus)
                                            }
                                        >
                                            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                                                <SelectValue placeholder="-- Vyberte stav --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Stav</SelectLabel>
                                                    {getAvailableSubjectStatusOptions(subject.subjectStatus).map(
                                                        (status) => (
                                                            <SelectItem key={status} value={status}>
                                                                {prettifySubjectStatus(status)}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <p className="font-bold">{prettifySubjectStatus(subject.subjectStatus)}</p>
                                    )}
                                </TableCell>
                                {!isStudent && (
                                    <TableCell className="py-2 px-4 border space-x-2 text-center">
                                        <Button variant="ghost" onClick={() => handleDeleteSubject(subject.subjectId)}>
                                            Vymazať
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <AddSubjectModal
                isOpen={isModalOpen}
                onSubmit={async (subjectName) => {
                    await addSubject({
                        name: subjectName,
                        tableId,
                    });
                    refetch();
                }}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export { SubjectsTablePage };

interface AddSubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (subjectName: string) => void;
}

const AddSubjectModal = ({ isOpen, onClose, onSubmit }: AddSubjectModalProps) => {
    const [subjectName, setSubjectName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(subjectName);
        onClose();
        setSubjectName('');
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 w-"
                    onClick={onClose}
                >
                    <div
                        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Pridať nový predmet</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectName">
                                    Názov predmetu
                                </label>
                                <Input
                                    id="subjectName"
                                    type="text"
                                    value={subjectName}
                                    onChange={(e) => setSubjectName(e.target.value)}
                                    required
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="ghost" type="button" onClick={onClose}>
                                    Zrušiť
                                </Button>
                                <Button type="submit">Pridať predmet</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
