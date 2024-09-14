import { SubjectInfo } from "./Subject";

export interface TableResponse {
    readonly tableId: string;
    readonly userId: string;
    readonly requestId: string;
    readonly tableStatus: "Approved" | "Declined" | "Pending";
    readonly subjects: Array<SubjectInfo>;
}
