import { ExamCard } from '@/components/examCard';
import { ExamDrawer } from '@/components/examDrawer';
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
import { Exam } from '@/types/skex/Exam';
import { FileText, Plus, Search, SlidersHorizontal, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ExamsFilter {
    searchTerm: string;
    isFinished: 'all' | 'finished' | 'notFinished';
    sort: 'ascending' | 'descending';
}

export function ExamsPage() {
    // const { data } = useGetExamsQuery();
    const data = exams;
    const [filter, setFilter] = useState<ExamsFilter>({ searchTerm: '', isFinished: 'all', sort: 'ascending' });

    const [openDrawer, setOpenDrawer] = useState({ create: false, update: false, delete: false });
    const navigate = useNavigate();

    const filteredData = useMemo(() => {
        if (data == null) return [];
        return data
            .filter((exam) => {
                if (filter.isFinished === 'finished' && !exam.isFinished) return false;
                if (filter.isFinished === 'notFinished' && exam.isFinished) return false;
                if (!exam.name.toLowerCase().includes(filter.searchTerm.toLowerCase())) return false;
                return true;
            })
            .sort((a, b) => {
                if (filter.sort === 'ascending') return a.date.localeCompare(b.date);
                return b.date.localeCompare(a.date);
            });
    }, [data, filter]);

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
                        <BreadcrumbPage>Skusky z jazyka</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <ExamDrawer open={openDrawer.create} setOpen={(v) => setOpenDrawer({ ...openDrawer, create: v })} />
            <ExamDrawer
                isUpdate
                open={openDrawer.update}
                setOpen={(v) => setOpenDrawer({ ...openDrawer, update: v })}
            />

            <AlertDialog
                open={openDrawer.delete}
                onOpenChange={(value: boolean) => setOpenDrawer({ ...openDrawer, delete: value })}
            >
                <AlertDialogTrigger asChild>
                    <Button style={{ display: 'none' }}>Open</Button>
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
                            onClick={() => {
                                setOpenDrawer({ ...openDrawer, delete: false });
                            }}
                        >
                            Vymazať
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Skusky z jazyka</h1>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
                <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
                    <div className="relative flex items-center">
                        <Search className="absolute left-3 text-muted-foreground" size={16} />
                        <Input
                            placeholder="Filter exams..."
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
                                {filter.isFinished === 'all' && 'All Exams'}
                                {filter.isFinished === 'finished' && 'Finished'}
                                {filter.isFinished === 'notFinished' && 'Not Finished'}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Exams</SelectItem>
                            <SelectItem value="finished">Finished</SelectItem>
                            <SelectItem value="notFinished">Not Finished</SelectItem>
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
                                <span>Newer First</span>
                            </SelectItem>
                            <SelectItem value="descending">
                                <span>Older First</span>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
                    <Button variant="outline">
                        <Upload size={16} className="mr-2" />
                        Upload Students
                    </Button>
                    <Button variant="outline">
                        <FileText size={16} className="mr-2" />
                        Upload Results
                    </Button>
                    <Button onClick={() => setOpenDrawer({ ...openDrawer, create: true })}>
                        <Plus size={16} className="mr-2 mt-0.5" />
                        Create Exam
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
                        onEdit={() => setOpenDrawer({ ...openDrawer, update: true })}
                        onDelete={() => setOpenDrawer({ ...openDrawer, delete: true })}
                    />
                ))}
            </div>
        </div>
    );
}

const exams: Exam[] = [
    {
        name: 'Exam 1',
        audience: 'Students',
        date: '12.12.2021',
        examType: 'Grammar',
        id: 1,
        isFinished: false,
    },
    {
        name: 'Exam 2',
        audience: 'Students',
        date: '12.12.2021',
        examType: 'Grammar',
        id: 2,
        isFinished: true,
    },
    {
        name: 'Exam 3',
        audience: 'Students',
        date: '12.12.2021',
        examType: 'Grammar',
        id: 3,
        isFinished: false,
    },
];
