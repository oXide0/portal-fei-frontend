import { ExamType } from './Exam';

export interface Student {
    email: string;
    name: string;
    surname: string;
    studyProgram: string;
    is_assigned: boolean; // change
}

export interface GetStudentParams {
    exam_id: number; // change
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
    mark: 0;
}
