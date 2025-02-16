import { CreateSubjectBody, CreateSubjectResponse, EvaluateSubject, SubjectStatus } from '../../types/isp/Subject';
import { api } from '../api';

export const subjectApi = api.injectEndpoints({
    endpoints: (builder) => ({
        evaluateSubject: builder.mutation<{ subjectStatus: SubjectStatus }, EvaluateSubject>({
            query: ({ subjectId, evaluationStatus }) => ({
                url: `isp/subjects/${subjectId}/evaluate`,
                method: 'POST',
                body: { evaluationStatus },
            }),
            invalidatesTags: ['Subject'],
        }),
        createSubject: builder.mutation<CreateSubjectResponse, CreateSubjectBody>({
            query: (body) => ({
                url: 'isp/subjects',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Subject'],
        }),
        deleteSubject: builder.mutation<void, string>({
            query: (subjectId) => ({
                url: `isp/subjects/${subjectId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Subject'],
        }),
    }),
});

export const { useCreateSubjectMutation, useDeleteSubjectMutation, useEvaluateSubjectMutation } = subjectApi;
