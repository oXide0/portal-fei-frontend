import { ExamDrawer } from '@/components/examDrawer';
import { StudentsTable } from '@/components/studentsTable';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRequiredParam } from '@/hooks/useRequiredParam';
import {
    useDeleteExamMutation,
    useGetExamByIdQuery,
    useUpdateExamDetailsMutation,
    useUpdateExamStudentsMutation,
} from '@/services/skex/exam';
import { useGetStudentsQuery } from '@/services/skex/student';
import { format } from 'date-fns';
import { Calendar, CheckCircle, Edit, FileText, Trash, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Filter {
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
}

export function ExamDetailPage() {
    const examId = useRequiredParam('id');
    const [openDrawer, setOpenDrawer] = useState({ update: false, delete: false });
    const [filter, setFilter] = useState<Filter>({ name: undefined, surname: undefined, email: undefined });
    const { toast } = useToast();

    const { data: exam } = useGetExamByIdQuery(parseInt(examId));
    const { data: students } = useGetStudentsQuery({
        exam_id: parseInt(examId),
        email: filter.email,
        name: filter.name,
        surname: filter.surname,
    });

    const [updateExamDetails] = useUpdateExamDetailsMutation();
    const [updateExamStudents] = useUpdateExamStudentsMutation();
    const [deleteExam] = useDeleteExamMutation();

    if (exam == null || students == null) return <div className="loader"></div>;

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Kategórie</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/skex/exams">Skúšky z jazyka</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Detail skúšky</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <ExamDrawer
                isUpdate
                open={openDrawer.update}
                setOpen={(v) => setOpenDrawer({ ...openDrawer, update: v })}
                initialValues={{
                    name: exam.name,
                    audience: exam.audience,
                    date: new Date(exam.date),
                    comment: exam.comment,
                    examType: exam.examType,
                }}
                onSubmit={async (data) => {
                    await updateExamDetails({
                        examId: parseInt(examId),
                        updateExamCommand: {
                            name: data.name,
                            audience: data.audience,
                            date: data.date.toISOString(),
                            comment: data.comment,
                            examType: data.examType,
                        },
                    });
                    setOpenDrawer({ ...openDrawer, update: false });
                    toast({
                        className: 'bg-green-100',
                        description: (
                            <div className="flex items-center gap-2">
                                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                <span>Skúška bola úspešne aktualizovaná!</span>
                            </div>
                        ),
                    });
                }}
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
                            Táto akcia je nevratná a všetky údaje budú stratené.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenDrawer({ ...openDrawer, delete: false })}>
                            Zrušiť
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                await deleteExam(parseInt(examId));
                                setOpenDrawer({ ...openDrawer, delete: false });
                                toast({
                                    className: 'bg-green-100',
                                    description: (
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                            <span>Skúška bola úspešne vymazaná!</span>
                                        </div>
                                    ),
                                });
                            }}
                        >
                            Vymazať
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex justify-between items-center py-6">
                <h1 className="text-3xl font-bold tracking-tight">{exam.name}</h1>
                <div className="flex gap-4">
                    <Button variant="secondary" onClick={() => setOpenDrawer({ ...openDrawer, update: true })}>
                        <Edit className="mr-2 h-4 w-4" />
                        Upraviť skúšku
                    </Button>
                    <Button onClick={() => setOpenDrawer({ ...openDrawer, delete: true })}>
                        <Trash className="mr-2 h-4 w-4" />
                        Vymazať skúšku
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 py-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Miestnosť</CardTitle>
                        <User className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{exam.audience}</div>
                        <p className="text-xs text-muted-foreground">Cieľová miestnosť pre skúšku</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Dátum skúšky</CardTitle>
                        <Calendar className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{format(new Date(exam.date), 'MMMM dd, yyyy')}</div>
                        <p className="text-xs text-muted-foreground">Naplánovaný dátum skúšky</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Typ skúšky</CardTitle>
                        <FileText className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{exam.examType}</div>
                        <p className="text-xs text-muted-foreground">Typ skúšky: letný alebo zimný semester</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Dokončené</CardTitle>
                        <CheckCircle className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">{exam.isFinished ? 'Áno' : 'Nie'}</div>
                        <p className="text-xs text-muted-foreground">Stav: Dokončené alebo Nie</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Komentár</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border p-4 rounded-lg bg-muted-foreground text-sm text-gray-800">
                        <p>{exam.comment}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="pt-3">
                <h2 className="text-2xl font-semibold py-4">Študenti</h2>
                <StudentsTable
                    data={students}
                    values={{ name: filter.name ?? '', surname: filter.surname ?? '', email: filter.email ?? '' }}
                    onChange={setFilter}
                    onReset={() => setFilter({ name: '', surname: '', email: '' })}
                    onSubmit={async (selectedStudentMails) => {
                        await updateExamStudents({
                            examId: parseInt(examId),
                            updateExamCommand: {
                                students: selectedStudentMails,
                            },
                        });
                        toast({
                            className: 'bg-green-100',
                            description: (
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Študenti boli úspešne aktualizovaní!</span>
                                </div>
                            ),
                        });
                    }}
                />
            </div>
        </>
    );
}
