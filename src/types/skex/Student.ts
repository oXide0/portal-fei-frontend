export interface Student {
    email: string;
    name: string;
    surname: string;
    studyProgram: string;
    isAssigned: boolean;
}

export interface GetStudentParams {
    examId: number;
    name?: string;
    surname?: string;
    email?: string;
}
