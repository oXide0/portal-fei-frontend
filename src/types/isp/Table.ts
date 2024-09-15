import { SubjectInfo } from "./Subject";

export type TableStatus = "Approved" | "Declined" | "Pending";

export interface TableResponse {
    readonly tableId: string;
    readonly userId: string;
    readonly requestId: string;
    readonly tableStatus: TableStatus;
    readonly subjects: Array<SubjectInfo>;
}

export interface EvaluateTableBody {
    tableId: string;
    userId: string;
    tableStatus: TableStatus;
}
