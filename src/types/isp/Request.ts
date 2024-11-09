export type RequestStatus = 'APPROVED' | 'APPROVED_BY_REFERENT' | 'DECLINED' | 'PENDING' | 'RETURNED';

export interface RequestResponse {
    readonly requestId: string;
    readonly userId: string;
    readonly studentName: string;
    readonly studentSurname: string;
    readonly studyProgram: string;
    readonly studyDegree: string;
    readonly studyYear: number;
    readonly requestStatus: RequestStatus;
    readonly purpose: string;
    readonly reason: string;
    readonly attachmentUrl: string;
    readonly tableId: string;
}

export interface CreateRequestResponse {
    requestId: string;
    requestStatus: RequestStatus;
}

export interface UpdateRequestResponse {
    requestStatus: RequestStatus;
    attachmentUrl: string;
}

export interface EvaluateRequestBody {
    requestId: string;
    evaluationStatus: RequestStatus;
}
