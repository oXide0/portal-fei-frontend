import { GetStudentParams, Student } from '@/types/skex/Student';
import { api } from '../api';

export const studentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        loadStudents: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: 'skex/students',
                method: 'POST',
                body: formData,
            }),
        }),
        getFilteredStudents: builder.query<Student[], GetStudentParams>({
            query: ({ name, surname, email, examId }) => ({
                url: `skex/exams/${examId}/students/filter`,
                params: { name, surname, email },
            }),
        }),
        deleteStudents: builder.mutation<void, void>({
            query: () => ({
                url: 'skex/students',
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useLoadStudentsMutation, useGetFilteredStudentsQuery, useDeleteStudentsMutation } = studentApi;
