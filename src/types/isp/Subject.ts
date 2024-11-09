export type SubjectStatus = 'APPROVED' | 'DECLINED' | 'PENDING';

export interface SubjectInfo {
    readonly subjectId: string;
    readonly userId: string;
    readonly tableId: string;
    readonly subjectStatus: SubjectStatus;
    readonly name: string;
}

export interface EvaluateSubject {
    readonly subjectId: string;
    readonly subjectStatus: SubjectStatus;
}

export interface CreateSubjectResponse {
    readonly subjectId: string;
    readonly userID: string;
    readonly tableId: string;
    readonly name: string;
    readonly subjectStatus: SubjectStatus;
}

export interface CreateSubjectBody {
    readonly tableId: string;
    readonly name: string;
}
