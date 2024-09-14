export interface RequestResponse {
    readonly requestId: string;
    readonly userId: string;
    readonly studentName: string;
    readonly studentSurname: string;
    readonly studyProgram: string;
    readonly studyDegree: string;
    readonly studyYear: number;
    readonly requestStatus: "Approved" | "Declined" | "Pending" | "Returned";
    readonly purpose: string;
    readonly reason: string;
    readonly attachment: string | null;
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
    attachment: File | null;
}
