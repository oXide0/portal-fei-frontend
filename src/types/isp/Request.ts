export type RequestStatus = "APPROVED" | "DECLINED" | "PENDING" | "RETURNED";

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
    readonly attachment: string | null;
    readonly tableId: string;
}

export interface CreateRequestBody {
    userId: string;
    studentName: string;
    studentSurname: string;
    studyProgram: string;
    studyDegree: string;
    studyYear: number;
    purpose: string;
    reason: string;
    attachment: string | null;
}

export interface UpdateRequestBody extends Partial<CreateRequestBody> {
    requestId: string;
}

export interface EvaluateRequestBody {
    requestId: string;
    evaluationStatus: RequestStatus;
}
