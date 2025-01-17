import { ExamCard } from '@/components/examCard';
import { ExamDrawer } from '@/components/examDrawer';
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
import { ChevronDown, ChevronUp, FileText, Plus, SlidersHorizontal, Upload } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function ExamsPage() {
    const [sort, setSort] = useState('ascending');
    const [appType, setAppType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    const appText = new Map<string, string>([
        ['all', 'All Apps'],
        ['connected', 'Connected'],
        ['notConnected', 'Not Connected'],
    ]);

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

            <ExamDrawer open={openDrawer} setOpen={setOpenDrawer} />

            <div>
                <h1 className="text-2xl font-bold tracking-tight">Skusky z jazyka</h1>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
                <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
                    <Input
                        placeholder="Filter apps..."
                        className="h-9 w-40 lg:w-[250px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select value={appType} onValueChange={setAppType}>
                        <SelectTrigger className="w-36">
                            <SelectValue>{appText.get(appType)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Apps</SelectItem>
                            <SelectItem value="connected">Connected</SelectItem>
                            <SelectItem value="notConnected">Not Connected</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sort} onValueChange={setSort}>
                        <SelectTrigger className="w-16">
                            <SelectValue>
                                <SlidersHorizontal size={18} />
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="ascending">
                                <div className="flex items-center gap-4">
                                    <ChevronUp size={16} />
                                    <span>Ascending</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="descending">
                                <div className="flex items-center gap-4">
                                    <ChevronDown size={16} />
                                    <span>Descending</span>
                                </div>
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
                    <Button onClick={() => setOpenDrawer(true)}>
                        <Plus size={16} className="mr-2 mt-0.5" />
                        Create Exam
                    </Button>
                </div>
            </div>
            <Separator className="shadow" />
            <div className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
                {exams.map((exam) => (
                    <ExamCard {...exam} onClick={() => navigate('/skex/exam/1232')} />
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
