import { CreateSubjectBody, CreateSubjectResponse, EvaluateSubject, SubjectStatus } from '../../types/isp/Subject';
import { ispApi } from './api';

export const subjectApi = ispApi.injectEndpoints({
    endpoints: (builder) => ({
        evaluateSubject: builder.mutation<{ subjectStatus: SubjectStatus }, EvaluateSubject>({
            query: ({ subjectId, evaluationStatus }) => ({
                url: `subjects/${subjectId}/evaluate`,
                method: 'PATCH',
                body: { evaluationStatus },
            }),
            invalidatesTags: ['Subject'],
        }),
        createSubject: builder.mutation<CreateSubjectResponse, CreateSubjectBody>({
            query: (body) => ({
                url: 'subjects',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Subject'],
        }),
        deleteSubject: builder.mutation<void, string>({
            query: (subjectId) => ({
                url: `subjects/${subjectId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Subject'],
        }),
    }),
});

export const { useCreateSubjectMutation, useDeleteSubjectMutation, useEvaluateSubjectMutation } = subjectApi;
