import { ExamDrawer } from '@/components/examDrawer';
import { studentColumns } from '@/components/student-columns';
import { DataTable } from '@/components/studentsTable';
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
import { useRequiredParam } from '@/hooks/useRequiredParam';
import {
    useDeleteExamMutation,
    useGetExamByIdQuery,
    useUpdateExamDetailsMutation,
    useUpdateExamStudentsMutation,
} from '@/services/skex/exam';
import { useGetFilteredStudentsQuery } from '@/services/skex/student';
import { GetDetailedExamResponse } from '@/types/skex/Exam';
import { Student } from '@/types/skex/Student';
import { Calendar, CheckCircle, Edit, FileText, Trash, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function ExamDetailPage() {
    const examId = useRequiredParam('id');
    const [openDrawer, setOpenDrawer] = useState({ update: false, delete: false });
    const [filter, setFilter] = useState({ name: '', surname: '', email: '' });

    // const { data: exam } = useGetExamByIdQuery(parseInt(examId));
    // const { data: students } = useGetFilteredStudentsQuery({
    //     examId: parseInt(examId),
    //     email: filter.email,
    //     name: filter.name,
    //     surname: filter.surname,
    // });
    const students: Student[] = [
        {
            email: 'john.doe@gmail.com',
            name: 'John',
            surname: 'Doe',
            studyProgram: 'Computer Science',
            isAssigned: true,
        },
        {
            email: 'jane.doe@gmail.com',
            name: 'Jane',
            surname: 'Doe',
            studyProgram: 'Computer Science',
            isAssigned: false,
        },
    ];
    const [updateExamDetails] = useUpdateExamDetailsMutation();
    const [updateExamStudents] = useUpdateExamStudentsMutation();
    const [deleteExam] = useDeleteExamMutation();

    // if (exam == null || students == null) return <div className="loader"></div>;

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
                            <Link to="/skex/exams">Skusky z jazyka</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Detail skusky</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <ExamDrawer
                isUpdate
                open={openDrawer.update}
                setOpen={(v) => setOpenDrawer({ ...openDrawer, update: v })}
                initialValues={{
                    name: data.name,
                    audience: data.audience,
                    date: new Date(data.date),
                    comment: data.comment,
                    examType: data.examType,
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
                }}
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
                            onClick={async () => {
                                await deleteExam(parseInt(examId));
                                setOpenDrawer({ ...openDrawer, delete: false });
                            }}
                        >
                            Vymazať
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex justify-between items-center py-6">
                <h1 className="text-3xl font-bold tracking-tight">Math Final Exam</h1>
                <div className="flex gap-4">
                    <Button variant="secondary" onClick={() => setOpenDrawer({ ...openDrawer, update: true })}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Exam
                    </Button>
                    <Button onClick={() => setOpenDrawer({ ...openDrawer, delete: true })}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Exam
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 py-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Audience</CardTitle>
                        <User className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">All 10th Graders</div>
                        <p className="text-xs text-muted-foreground">Target Group for the Exam</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Exam Date</CardTitle>
                        <Calendar className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">January 25, 2025</div>
                        <p className="text-xs text-muted-foreground">Scheduled Exam Date</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Exam Type</CardTitle>
                        <FileText className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Written Exam</div>
                        <p className="text-xs text-muted-foreground">Exam Format</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Finished</CardTitle>
                        <CheckCircle className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">No</div>
                        <p className="text-xs text-muted-foreground">Status: Not completed</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Comment</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border p-4 rounded-lg bg-muted-foreground text-sm text-gray-800">
                        <p>This exam is for all 10th graders. Good luck!</p>
                    </div>
                </CardContent>
            </Card>

            <div className="pt-3">
                <h2 className="text-2xl font-semibold py-4">Students</h2>
                <DataTable
                    columns={studentColumns}
                    data={students}
                    values={filter}
                    onChange={setFilter}
                    onReset={() => setFilter({ name: '', surname: '', email: '' })}
                    defaultRowSelection={{ '1': true }}
                />
            </div>
        </>
    );
}

const data: GetDetailedExamResponse = {
    id: 1,
    name: 'Math Final Exam',
    audience: 'All 10th Graders',
    date: '2025-01-25',
    comment: 'This exam is for all 10th graders. Good luck!',
    examType: 'LETNY',
    isFinished: false,
};
