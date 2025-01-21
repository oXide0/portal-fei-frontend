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
            invalidatesTags: ['Exam'],
        }),
        deleteExam: builder.mutation<void, number>({
            query: (examId) => ({
                url: `skex/exams/${examId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Exam'],
        }),
        getExamById: builder.query<GetDetailedExamResponse, number>({
            query: (examId) => ({
                url: `skex/exams/${examId}`,
                method: 'GET',
            }),
            providesTags: ['Exam'],
        }),
        getExams: builder.query<Exam[], void>({
            query: () => ({
                url: 'skex/exams',
                method: 'GET',
            }),
            providesTags: ['Exam'],
        }),
        updateExamDetails: builder.mutation<void, { examId: number; updateExamCommand: UpdateExamDetailsCommand }>({
            query: ({ examId, updateExamCommand }) => ({
                url: `skex/exams/${examId}`,
                method: 'PATCH',
                body: updateExamCommand,
            }),
            invalidatesTags: ['Exam'],
        }),
        updateExamStudents: builder.mutation<void, { examId: number; updateExamCommand: UpdateExamStudentsCommand }>({
            query: ({ examId, updateExamCommand }) => ({
                url: `skex/exams/${examId}/students`,
                method: 'PATCH',
                body: updateExamCommand,
            }),
            invalidatesTags: ['Exam', 'Student'],
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
