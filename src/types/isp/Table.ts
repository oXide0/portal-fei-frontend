import { SubjectInfo } from './Subject';

export type TableStatus = 'APPROVED' | 'DECLINED' | 'PENDING';

export interface TableResponse {
    readonly tableId: string;
    readonly userId: string;
    readonly requestId: string;
    readonly tableStatus: TableStatus;
    readonly subjects: Array<SubjectInfo>;
}

export interface EvaluateTableBody {
    tableId: string;
    evaluationStatus: TableStatus;
}
