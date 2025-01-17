import { Student } from './Student';

export interface CreateExamCommand {
    name: string;
    audience: string;
    date: string;
    comment: string;
    examType: string;
}

export interface GetDetailedExamResponse {
    id: number;
    name: string;
    audience: string;
    date: string;
    comment: string;
    examType: string;
    isFinished: boolean;
    students: Array<Student>;
}

export interface Exam {
    id: number;
    name: string;
    audience: string;
    date: string;
    examType: string;
    isFinished: boolean;
}

export interface UpdateExamCommand {
    name: string;
    audience: string;
    date: string;
    comment: string;
    examType: string;
    students: Array<string>;
}
