import { SubjectModal } from '@/components/subjectModal';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
    const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
    const { role } = useAppSelector((state) => state.user);
    const isStudent = role === 'S';

    const { data, isLoading, refetch } = useGetTableQuery(tableId);
    const [evaluateTable] = useEvaluateTableMutation();
    const [evaluateSubject] = useEvaluateSubjectMutation();
    const [addSubject] = useAddSubjectForTableMutation();
    const [deleteSubject] = useDeleteSubjectForTableMutation();

    const handleDeleteSubject = async (subjectId: string) => {
        try {
            await deleteSubject(subjectId);
            refetch();
        } catch (error) {
            console.error('Error deleting subject:', error);
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

    if (isLoading || !data) return <div className="loader"></div>;

    return (
        <div>
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

            <AlertDialog
                open={subjectToDelete ? true : false}
                onOpenChange={(value: boolean) => {
                    if (!value) {
                        setSubjectToDelete(null);
                    }
                }}
            >
                <AlertDialogTrigger asChild>
                    <Button style={{ display: 'none' }}>Open</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ste si úplne istí?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Táto akcia sa nedá zvrátiť. Toto natrvalo vymaže predmet."
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSubjectToDelete(null)}>Zrušiť</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (subjectToDelete) {
                                    handleDeleteSubject(subjectToDelete);
                                    setSubjectToDelete(null);
                                }
                            }}
                        >
                            Vymazať
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <h1 className="text-3xl font-bold mb-4">Tabuľka Predmetov</h1>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">Status Tabuľky:</h2>
                        <h2
                            className={`text-xl font-semibold ${
                                data.tableStatus === 'APPROVED'
                                    ? 'text-green-600'
                                    : data.tableStatus === 'DECLINED'
                                      ? 'text-red-600'
                                      : 'text-yellow-600'
                            }`}
                        >
                            {prettifyTableStatus(data.tableStatus)}
                        </h2>
                    </div>
                    {!isStudent && data.tableStatus === 'PENDING' && (
                        <div className="mt-4 flex gap-4">
                            <Button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
                                onClick={() => handleChangeTableStatus('APPROVED')}
                            >
                                Schváliť Tabuľku
                            </Button>
                            <Button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                                onClick={() => handleChangeTableStatus('DECLINED')}
                            >
                                Zamietnuť Tabuľku
                            </Button>
                        </div>
                    )}
                </div>

                {!isStudent && (
                    <div className="text-right">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Pridať Predmet
                        </Button>
                    </div>
                )}

                <div className="overflow-x-auto bg-white p-6 rounded-lg shadow max-w-5xl">
                    <Table>
                        <TableCaption className="text-gray-500">Tabuľka Predmetov</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Názov Predmetu</TableHead>
                                <TableHead>Stav</TableHead>
                                {!isStudent && <TableHead>Akcie</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.subjects.map((subject) => (
                                <TableRow
                                    key={subject.subjectId}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >
                                    <TableCell className="py-3 px-4">{subject.name}</TableCell>
                                    <TableCell className="py-3 px-4">
                                        {isStudent ? (
                                            <p className="font-bold text-gray-800">
                                                {prettifySubjectStatus(subject.subjectStatus)}
                                            </p>
                                        ) : subject.subjectStatus === 'PENDING' ? (
                                            <Select
                                                defaultValue={subject.subjectStatus}
                                                onValueChange={(value) =>
                                                    handleChangeSubjectStatus(subject.subjectId, value as SubjectStatus)
                                                }
                                            >
                                                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded">
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
                                            <p className="font-bold text-gray-800">
                                                {prettifySubjectStatus(subject.subjectStatus)}
                                            </p>
                                        )}
                                    </TableCell>
                                    {!isStudent && (
                                        <TableCell className="py-3 px-4 text-center">
                                            <Button
                                                variant="ghost"
                                                className="text-red-600 hover:bg-red-50"
                                                onClick={() => setSubjectToDelete(subject.subjectId)}
                                            >
                                                Vymazať
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <SubjectModal
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
