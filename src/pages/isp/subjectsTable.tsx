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
import { Badge } from '@/components/ui/badge';
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { useMutationWithToast } from '@/hooks/useMutationWithToast';
import Fuse, { IFuseOptions } from 'fuse.js';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAvailableSubjectStatusOptions, prettifySubjectStatus, prettifyTableStatus } from '../../helpers';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useRequiredParam } from '../../hooks/useRequiredParam';
import {
    useCreateSubjectMutation,
    useDeleteSubjectMutation,
    useEvaluateSubjectMutation,
} from '../../services/isp/subject';
import { useEvaluateTableMutation, useGetTableQuery } from '../../services/isp/table';
import { SubjectInfo, SubjectStatus } from '../../types/isp/Subject';
import { TableStatus } from '../../types/isp/Table';

const SubjectsTablePage = () => {
    const tableId = useRequiredParam('tableId');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
    const { role } = useAppSelector((state) => state.user);
    const isStudent = role === 'S';
    const [searchTerm, setSearchTerm] = useState('');

    const { data, isLoading, refetch } = useGetTableQuery(tableId);
    const [evaluateTable] = useEvaluateTableMutation();
    const evaluateTableWithToast = useMutationWithToast(evaluateTable);
    const [evaluateSubject] = useEvaluateSubjectMutation();
    const evaluateSubjectWithToast = useMutationWithToast(evaluateSubject);
    const [addSubject] = useCreateSubjectMutation();
    const addSubjectWithToast = useMutationWithToast(addSubject);
    const [deleteSubject] = useDeleteSubjectMutation();
    const deleteSubjectWithToast = useMutationWithToast(deleteSubject);

    const handleChangeTableStatus = async (newStatus: TableStatus) => {
        await evaluateTableWithToast(
            {
                tableId,
                evaluationStatus: newStatus,
            },
            {
                successMessage: 'Tabuľka bola úspešne aktualizovaná',
                errorMessage: 'Nepodarilo sa aktualizovať tabuľku',
            },
        );
    };

    const filteredSubjects = useMemo(() => {
        const fuseOptions: IFuseOptions<SubjectInfo> = {
            keys: ['name', 'description'],
            threshold: 0.3,
        };

        const fuse = new Fuse(data?.subjects ?? [], fuseOptions);

        if (data == null) return [];

        return searchTerm ? fuse.search(searchTerm).map((result) => result.item) : data.subjects;
    }, [data, searchTerm]);

    if (isLoading || !data) return <div className="loader"></div>;

    return (
        <>
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
                        <BreadcrumbPage>Tabuľka predmetov</BreadcrumbPage>
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
                            onClick={async () => {
                                if (subjectToDelete) {
                                    await deleteSubjectWithToast(subjectToDelete, {
                                        successMessage: 'Predmet bol úspešne vymazaný',
                                        errorMessage: 'Nepodarilo sa vymazať predmet',
                                    });
                                    refetch();
                                    setSubjectToDelete(null);
                                }
                            }}
                        >
                            Vymazať
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-bold">Tabuľka predmetov</h1>
                    <Badge
                        variant={data.tableStatus === 'DECLINED' ? 'destructive' : 'default'}
                        className={data.tableStatus === 'APPROVED' ? 'bg-green-500' : ''}
                    >
                        {prettifyTableStatus(data.tableStatus)}
                    </Badge>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Možnosti</Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Akcie</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="text-green-600"
                            onClick={async () => {
                                await evaluateTableWithToast(
                                    {
                                        tableId,
                                        evaluationStatus: 'APPROVED',
                                    },
                                    {
                                        successMessage: 'Tabuľka bola úspešne aktualizovaná',
                                        errorMessage: 'Nepodarilo sa aktualizovať tabuľku',
                                    },
                                );
                            }}
                        >
                            Schváliť Tabuľku
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-red-600" onClick={() => handleChangeTableStatus('DECLINED')}>
                            Zamietnuť Tabuľku
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center justify-between pt-16 pb-4">
                <div className="relative flex items-center max-w-sm w-full">
                    <Search className="absolute left-3" size={16} />
                    <Input
                        placeholder="Filter exams..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {!isStudent && (
                    <div className="text-right">
                        <Button className="text-white px-4 py-2 rounded shadow" onClick={() => setIsModalOpen(true)}>
                            Pridať predmet
                        </Button>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <Table className="hidden md:table w-full">
                    <TableCaption className="text-gray-500">Tabuľka predmetov</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center border">Názov predmetu</TableHead>
                            <TableHead className="text-center border">Stav</TableHead>
                            {!isStudent && <TableHead className="text-center border">Akcie</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSubjects.map((subject) => (
                            <TableRow key={subject.subjectId} className="border">
                                <TableCell className="py-2 px-4 border text-center">{subject.name}</TableCell>

                                <TableCell className="py-2 px-4 border text-center">
                                    {isStudent ? (
                                        <p className="font-bold text-gray-800">
                                            {prettifySubjectStatus(subject.subjectStatus)}
                                        </p>
                                    ) : subject.subjectStatus === 'PENDING' ? (
                                        <Select
                                            defaultValue={subject.subjectStatus}
                                            onValueChange={async (value) => {
                                                await evaluateSubjectWithToast(
                                                    {
                                                        subjectId: subject.subjectId,
                                                        evaluationStatus: value as SubjectStatus,
                                                    },
                                                    {
                                                        successMessage: 'Stav predmetu bol úspešne aktualizovaný',
                                                        errorMessage: 'Nepodarilo sa aktualizovať stav predmetu',
                                                    },
                                                );
                                                refetch();
                                            }}
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
                                    <TableCell className="py-2 px-4 border flex justify-center">
                                        <Button
                                            variant="outline"
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

            <SubjectModal
                isOpen={isModalOpen}
                onSubmit={async (subjectName) => {
                    if (data.tableStatus !== 'PENDING') {
                        toast({
                            title: 'Chyba',
                            description: 'Nemôžete pridať predmet do tabuľky, ktorá nie je v stave "PENDING"',
                            className: 'bg-red-100',
                        });
                    }
                    await addSubjectWithToast(
                        {
                            name: subjectName,
                            tableId,
                        },
                        { successMessage: 'Predmet bol úspešne pridaný', errorMessage: 'Nepodarilo sa pridať predmet' },
                    );
                    refetch();
                }}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export { SubjectsTablePage };
