import { GetStudentParams, Student } from '@/types/skex/Student';
import { ispApi } from '../api';

export const studentApi = ispApi.injectEndpoints({
    endpoints: (builder) => ({
        loadStudents: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: '/students',
                method: 'POST',
                body: formData,
            }),
        }),
        getFilteredStudents: builder.query<Student[], GetStudentParams>({
            query: ({ name, surname, email }) => ({
                url: '/students',
                params: { name, surname, email },
            }),
        }),
        deleteStudents: builder.mutation<void, void>({
            query: () => ({
                url: '/students',
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useLoadStudentsMutation, useGetFilteredStudentsQuery, useDeleteStudentsMutation } = studentApi;
