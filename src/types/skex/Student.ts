export interface Student {
    mail: string;
    name: string;
    surname: string;
    studyProgram: string;
}

export interface GetStudentParams {
    name: string;
    surname: string;
    email: string;
}
