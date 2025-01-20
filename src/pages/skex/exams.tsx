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
import { useToast } from '@/hooks/use-toast';
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
import { FileText, Plus, Search, SlidersHorizontal, Upload, CheckCircle, TriangleAlertIcon } from 'lucide-react';
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
    const [updateExam, { isSuccess: isUpadateSuccess }] = useUpdateExamDetailsMutation();
    const [deleteExam] = useDeleteExamMutation();
    const [loadStudents] = useLoadStudentsMutation();
    const [loadResults] = useLoadResultsMutation();

    const { toast } = useToast();

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
                    await createExam({
                        name: data.name,
                        audience: data.audience,
                        date: data.date?.toISOString(),
                        comment: data.comment,
                        examType: data.examType,
                    });
                    setOpenDrawer({ ...openDrawer, create: false });
                    toast({
                        className: 'bg-green-100',
                        description: (
                            <div className="flex items-center gap-2">
                                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                <span>Skúška bola úspešne vytvorená</span>
                            </div>
                        ),
                    });
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
                    await updateExam({
                        examId,
                        updateExamCommand: {
                            name: data.name,
                            audience: data.audience,
                            date: data.date.toISOString(),
                            comment: data.comment,
                            examType: data.examType,
                        },
                    });
                    setOpenDrawer({ ...openDrawer, update: false });
                    if (isUpadateSuccess) {
                        toast({
                            className: 'bg-green-100',
                            description: (
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Skúška bola úspešne aktualizovaná</span>
                                </div>
                            ),
                        });
                    }
                }}
            />

            <StudentsUploadDrawer
                onSubmit={async (data) => {
                    const formData = new FormData();
                    formData.append('studentsFile', data.file);
                    try {
                        await loadStudents(formData).unwrap();
                        toast({
                            variant: 'default',
                            className: 'bg-green-100',
                            description: (
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Študenti boli úspešne nahraní</span>
                                </div>
                            ),
                        });
                    } catch (e) {
                        toast({
                            variant: 'default',
                            className: 'bg-red-100',
                            description: (
                                <div className="flex items-center gap-2">
                                    <TriangleAlertIcon className="mr-2 h-5 w-5 text-red-500" />
                                    <span>Chyba pri nahrávaní študentov</span>
                                </div>
                            ),
                        });
                    }

                    setUploadDrawer({ ...uploadDrawer, students: false });
                }}
                open={uploadDrawer.students}
                setOpen={(v) => setUploadDrawer({ ...uploadDrawer, students: v })}
            />

            <ResultsUploadDrawer
                onSubmit={async ({ examType, file }) => {
                    const formData = new FormData();
                    formData.append('resultsFile', file);
                    await loadResults({ resultsFile: formData, examType });
                    toast({
                        variant: 'default',
                        className: 'bg-green-100',
                        description: (
                            <div className="flex items-center gap-2">
                                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                <span>Výsledky boli úspešne nahrané</span>
                            </div>
                        ),
                    });
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
                                await deleteExam(examId);
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
