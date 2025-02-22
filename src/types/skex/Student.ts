import { ExamType } from './Exam';

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

export interface GetStudentExamsResponse {
    examId: number;
    examType: ExamType;
    isFinished: boolean;
    audience: string;
    date: string;
    name: string;
    mark: number;
}
