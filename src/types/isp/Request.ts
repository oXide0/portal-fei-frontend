export type RequestStatus = 'APPROVED' | 'APPROVED_BY_REFERENT' | 'DECLINED' | 'PENDING' | 'RETURNED';

export interface RequestResponse {
    readonly requestId: string;
    readonly userId: string;
    readonly studentName: string;
    readonly studentSurname: string;
    readonly studyProgram: string;
    readonly studyDegree: string;
    readonly studyYear: string;
    readonly requestStatus: RequestStatus;
    readonly purpose: string;
    readonly reason: string;
    readonly attachmentPath: string | null;
    readonly tableId: string;
}

export interface UpdateRequestResponse {
    requestStatus: RequestStatus;
}

export interface EvaluateRequestBody {
    requestId: string;
    evaluationStatus: RequestStatus;
}
