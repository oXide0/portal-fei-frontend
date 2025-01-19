export type ExamType = 'LETNY' | 'ZIMNY';

export interface CreateExamCommand {
    name: string;
    audience: string;
    date: string;
    comment: string;
    examType: ExamType;
}

export interface GetDetailedExamResponse {
    id: number;
    name: string;
    audience: string;
    date: string;
    comment: string;
    examType: ExamType;
    isFinished: boolean;
}

export interface Exam {
    id: number;
    name: string;
    audience: string;
    date: string;
    examType: ExamType;
    comment: string;
    isFinished: boolean;
}

export interface UpdateExamDetailsCommand {
    name: string;
    audience: string;
    date: string;
    comment: string;
    examType: ExamType;
}

export interface UpdateExamStudentsCommand {
    students: Array<string>;
}
