import { ExamType } from './Exam';

export interface UploadResultBody {
    resultsFile: File;
    examType: ExamType;
}
