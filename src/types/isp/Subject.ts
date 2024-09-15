export interface SubjectInfo {
    readonly subjectId: string;
    readonly userId: string;
    readonly tableId: string;
    readonly subjectStatus: string;
    readonly name: string;
}

export interface EvaluateSubject {
    readonly subjectId: string;
    readonly subjectStatus: string;
}

export interface CreateSubjectResponse {
    readonly subjectId: string;
    readonly userId: string;
    readonly tableId: string;
    readonly name: string;
    readonly subjectStatus: string;
}

export interface CreateSubjectBody {
    readonly userId: string;
    readonly tableId: string;
    readonly name: string;
    readonly subjectStatus: string;
}
