import { GetStudentExamsResponse, GetStudentParams, Student } from '@/types/skex/Student';
import { api } from '../api';

export const studentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        loadStudents: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: 'skex/students',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Student'],
        }),
        getStudents: builder.query<Array<Student>, GetStudentParams>({
            query: ({ name, surname, email, examId }) => ({
                url: `skex/students`,
                params: { name, surname, email, examId },
            }),
            providesTags: ['Student'],
        }),
        getStudentExams: builder.query<Array<GetStudentExamsResponse>, void>({
            query: () => ({
                url: `skex/students/exams`,
                method: 'GET',
            }),
            providesTags: ['Student'],
        }),
        deleteStudents: builder.mutation<void, void>({
            query: () => ({
                url: 'skex/students',
                method: 'DELETE',
            }),
            invalidatesTags: ['Student'],
        }),
    }),
});

export const { useLoadStudentsMutation, useGetStudentExamsQuery, useGetStudentsQuery, useDeleteStudentsMutation } =
    studentApi;
