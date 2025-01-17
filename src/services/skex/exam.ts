import { CreateExamCommand, GetDetailedExamResponse, Exam, UpdateExamCommand } from '@/types/skex/Exam';
import { ispApi } from '../api';

export const examApi = ispApi.injectEndpoints({
    endpoints: (builder) => ({
        createExam: builder.mutation<void, CreateExamCommand>({
            query: (createExamCommand) => ({
                url: '/exams',
                method: 'POST',
                body: createExamCommand,
            }),
        }),
        deleteExam: builder.mutation<void, number>({
            query: (examId) => ({
                url: `/exams/${examId}`,
                method: 'DELETE',
            }),
        }),
        getExamById: builder.query<GetDetailedExamResponse, number>({
            query: (examId) => ({
                url: `/exams/${examId}`,
                method: 'GET',
            }),
        }),
        getExams: builder.query<Exam[], void>({
            query: () => ({
                url: '/exams',
                method: 'GET',
            }),
        }),
        updateExam: builder.mutation<void, { examId: number; updateExamCommand: UpdateExamCommand }>({
            query: ({ examId, updateExamCommand }) => ({
                url: `/exams/${examId}`,
                method: 'PUT',
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
    useUpdateExamMutation,
} = examApi;
