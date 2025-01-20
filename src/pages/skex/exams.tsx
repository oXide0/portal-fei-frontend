import { ExamCard } from '@/components/examCard';
import { ExamDrawer } from '@/components/examDrawer';
import { ResultsUploadDrawer } from '@/components/resultsUploadDrawer';
import { StudentsUploadDrawer } from '@/components/studentsUploadDrawer';
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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { call } from '@/helpers';
import { useMutationWithToast } from '@/hooks/useMutationWithToast';
import {
    useCreateExamMutation,
    useDeleteExamMutation,
    useGetExamsQuery,
    useUpdateExamDetailsMutation,
} from '@/services/skex/exam';
import { useLoadResultsMutation } from '@/services/skex/result';
import { useLoadStudentsMutation } from '@/services/skex/student';
import { Exam } from '@/types/skex/Exam';
import Fuse, { IFuseOptions } from 'fuse.js';
import { FileText, Plus, Search, SlidersHorizontal, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ExamsFilter {
    searchTerm: string;
    isFinished: 'all' | 'finished' | 'notFinished';
    sort: 'ascending' | 'descending';
}

export function ExamsPage() {
    const { data } = useGetExamsQuery();
    const [createExam] = useCreateExamMutation();
    const createExamWithToast = useMutationWithToast(createExam);
    const [updateExam] = useUpdateExamDetailsMutation();
    const updateExamWithToast = useMutationWithToast(updateExam);
    const [deleteExam] = useDeleteExamMutation();
    const deleteExamWithToast = useMutationWithToast(deleteExam);
    const [loadStudents] = useLoadStudentsMutation();
    const loadStudentsWithToast = useMutationWithToast(loadStudents);
    const [loadResults] = useLoadResultsMutation();
    const loadResultsWithToast = useMutationWithToast(loadResults);

    const [filter, setFilter] = useState<ExamsFilter>({
        searchTerm: '',
        isFinished: 'all',
        sort: 'ascending',
    });

    const [openDrawer, setOpenDrawer] = useState({ create: false, update: false, delete: false });
    const [uploadDrawer, setUploadDrawer] = useState({ students: false, results: false });
    const [examId, setExamId] = useState<number | null>(null);
    const navigate = useNavigate();

    const fuseOptions: IFuseOptions<Exam> = {
        keys: ['name', 'description'],
        threshold: 0.3,
    };

    const fuse = new Fuse(data ?? [], fuseOptions);

    const filteredData = useMemo(() => {
        if (data == null) return [];

        const filteredByStatus = data.filter((exam) => {
            if (filter.isFinished === 'finished' && !exam.isFinished) return false;
            if (filter.isFinished === 'notFinished' && exam.isFinished) return false;
            return true;
        });

        const searchTermFiltered = filter.searchTerm
            ? fuse.search(filter.searchTerm).map((result) => result.item)
            : filteredByStatus;

        return searchTermFiltered.sort((a, b) => {
            if (filter.sort === 'ascending') return a.date.localeCompare(b.date);
            return b.date.localeCompare(a.date);
        });
    }, [data, filter]);

    if (data == null) return <div className="loader"></div>;

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
                        <BreadcrumbPage>Skúšky z jazyka</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <ExamDrawer
                open={openDrawer.create}
                setOpen={(v) => setOpenDrawer({ ...openDrawer, create: v })}
                onSubmit={async (data) => {
                    await createExamWithToast(
                        {
                            name: data.name,
                            audience: data.audience,
                            date: data.date.toISOString(),
                            comment: data.comment,
                            examType: data.examType,
                        },
                        { successMessage: 'Skúška bola úspešne vytvorená', errorMessage: 'Chyba pri vytváraní skúšky' },
                    );
                    setOpenDrawer({ ...openDrawer, create: false });
                }}
            />
            <ExamDrawer
                isUpdate
                open={openDrawer.update}
                setOpen={(v) => setOpenDrawer({ ...openDrawer, update: v })}
                initialValues={call(() => {
                    const exam = data.find((exam) => exam.id === examId);
                    if (exam == null) return undefined;
                    return {
                        name: exam.name,
                        audience: exam.audience,
                        date: new Date(exam.date),
                        comment: exam.comment,
                        examType: exam.examType,
                    };
                })}
                onSubmit={async (data) => {
                    if (examId == null) return;
                    await updateExamWithToast(
                        {
                            examId,
                            updateExamCommand: {
                                name: data.name,
                                audience: data.audience,
                                date: data.date.toISOString(),
                                comment: data.comment,
                                examType: data.examType,
                            },
                        },
                        {
                            successMessage: 'Skúška bola úspešne aktualizovaná',
                            errorMessage: 'Chyba pri aktualizovaní skúšky',
                        },
                    );
                    setOpenDrawer({ ...openDrawer, update: false });
                }}
            />

            <StudentsUploadDrawer
                onSubmit={async (data) => {
                    const formData = new FormData();
                    formData.append('studentsFile', data.file);
                    await loadStudentsWithToast(formData, {
                        successMessage: 'Študenti boli úspešne nahraní',
                        errorMessage: 'Chyba pri nahrávaní študentov',
                    });

                    setUploadDrawer({ ...uploadDrawer, students: false });
                }}
                open={uploadDrawer.students}
                setOpen={(v) => setUploadDrawer({ ...uploadDrawer, students: v })}
            />

            <ResultsUploadDrawer
                onSubmit={async ({ examType, file }) => {
                    const formData = new FormData();
                    formData.append('resultsFile', file);
                    await loadResultsWithToast(
                        { resultsFile: formData, examType },
                        {
                            successMessage: 'Výsledky boli úspešne nahrané',
                            errorMessage: 'Chyba pri nahrávaní výsledkov',
                        },
                    );
                    setUploadDrawer({ ...uploadDrawer, results: false });
                }}
                open={uploadDrawer.results}
                setOpen={(v) => setUploadDrawer({ ...uploadDrawer, results: v })}
            />

            <AlertDialog
                open={openDrawer.delete}
                onOpenChange={(value: boolean) => setOpenDrawer({ ...openDrawer, delete: value })}
            >
                <AlertDialogTrigger asChild>
                    <Button style={{ display: 'none' }}>Otvoriť</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ste si úplne istí?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Táto akcia je nevratná a všetky dáta budú stratené.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenDrawer({ ...openDrawer, delete: false })}>
                            Zrušiť
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                if (examId == null) return;
                                await deleteExamWithToast(examId, {
                                    successMessage: 'Skúška bola úspešne vymazaná',
                                    errorMessage: 'Chyba pri mazaní skúšky',
                                });
                                setOpenDrawer({ ...openDrawer, delete: false });
                            }}
                        >
                            Vymazať
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Skúšky z jazyka</h1>
                <p className="text-gray-500">
                    Nahrať zoznam študentov, pridať výsledky a prehliadať si aktuálne alebo minulé skúšky.
                </p>
            </div>
            <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
                <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
                    <div className="relative flex items-center">
                        <Search className="absolute left-3 text-muted-foreground" size={16} />
                        <Input
                            placeholder="Filtrovať skúšky..."
                            className="h-9 w-40 lg:w-[300px] pl-10"
                            value={filter.searchTerm}
                            onChange={(e) => setFilter({ ...filter, searchTerm: e.target.value })}
                        />
                    </div>

                    <Select
                        value={filter.isFinished}
                        onValueChange={(value: 'all' | 'finished' | 'notFinished') =>
                            setFilter({ ...filter, isFinished: value })
                        }
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue>
                                {filter.isFinished === 'all' && 'Všetky skúšky'}
                                {filter.isFinished === 'finished' && 'Dokončené'}
                                {filter.isFinished === 'notFinished' && 'Nedokončené'}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Všetky skúšky</SelectItem>
                            <SelectItem value="finished">Dokončené</SelectItem>
                            <SelectItem value="notFinished">Nedokončené</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={filter.sort}
                        onValueChange={(value: 'ascending' | 'descending') => setFilter({ ...filter, sort: value })}
                    >
                        <SelectTrigger className="w-16">
                            <SelectValue>
                                <SlidersHorizontal size={18} />
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="ascending">
                                <span>Novšie</span>
                            </SelectItem>
                            <SelectItem value="descending">
                                <span>Staršie</span>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
                    <Button variant="outline" onClick={() => setUploadDrawer({ ...uploadDrawer, students: true })}>
                        <Upload size={16} className="mr-2" />
                        Nahrať študentov
                    </Button>
                    <Button variant="outline" onClick={() => setUploadDrawer({ ...uploadDrawer, results: true })}>
                        <FileText size={16} className="mr-2" />
                        Nahrať výsledky
                    </Button>
                    <Button onClick={() => setOpenDrawer({ ...openDrawer, create: true })}>
                        <Plus size={16} className="mr-2 mt-0.5" />
                        Vytvoriť skúšku
                    </Button>
                </div>
            </div>

            <Separator className="shadow" />

            <div className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((exam) => (
                    <ExamCard
                        key={exam.id}
                        name={exam.name}
                        audience={exam.audience}
                        date={exam.date}
                        examType={exam.examType}
                        isFinished={exam.isFinished}
                        onClick={() => navigate(`/skex/exam/${exam.id}`)}
                        onEdit={() => {
                            setExamId(exam.id);
                            setOpenDrawer({ ...openDrawer, update: true });
                        }}
                        onDelete={() => {
                            setExamId(exam.id);
                            setOpenDrawer({ ...openDrawer, delete: true });
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
