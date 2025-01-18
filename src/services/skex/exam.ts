import {
    CreateExamCommand,
    GetDetailedExamResponse,
    Exam,
    UpdateExamDetailsCommand,
    UpdateExamStudentsCommand,
} from '@/types/skex/Exam';
import { api } from '../api';

export const examApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createExam: builder.mutation<void, CreateExamCommand>({
            query: (createExamCommand) => ({
                url: 'skex/exams',
                method: 'POST',
                body: createExamCommand,
            }),
        }),
        deleteExam: builder.mutation<void, number>({
            query: (examId) => ({
                url: `skex/exams/${examId}`,
                method: 'DELETE',
            }),
        }),
        getExamById: builder.query<GetDetailedExamResponse, number>({
            query: (examId) => ({
                url: `skex/exams/${examId}`,
                method: 'GET',
            }),
        }),
        getExams: builder.query<Exam[], void>({
            query: () => ({
                url: 'skex/exams',
                method: 'GET',
            }),
        }),
        updateExamDetails: builder.mutation<void, { examId: number; updateExamCommand: UpdateExamDetailsCommand }>({
            query: ({ examId, updateExamCommand }) => ({
                url: `skex/exams/${examId}`,
                method: 'PATCH',
                body: updateExamCommand,
            }),
        }),
        updateExamStudents: builder.mutation<void, { examId: number; updateExamCommand: UpdateExamStudentsCommand }>({
            query: ({ examId, updateExamCommand }) => ({
                url: `skex/exams/${examId}/students`,
                method: 'PATCH',
                body: updateExamCommand,
            }),
        }),
    }),
});

export const {
    useCreateExamMutation,
    useDeleteExamMutation,
    useGetExamByIdQuery,
    useGetExamsQuery,
    useUpdateExamDetailsMutation,
    useUpdateExamStudentsMutation,
} = examApi;
