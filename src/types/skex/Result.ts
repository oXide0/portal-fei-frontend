import { ExamType } from './Exam';

export interface UploadResultBody {
    resultsFile: FormData;
    examType: ExamType;
}
