import {
    CreateSubjectBody,
    CreateSubjectResponse,
    EvaluateSubject,
} from "../../types/isp/Subject";
import { ispApi } from "./api";

export const subjectApi = ispApi.injectEndpoints({
    endpoints: (builder) => ({
        evaluateSubject: builder.mutation<EvaluateSubject, EvaluateSubject>({
            query: (body) => ({
                url: "subjects/evaluate",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Subject"],
        }),
        addSubjectForTable: builder.mutation<
            CreateSubjectResponse,
            CreateSubjectBody
        >({
            query: (body) => ({
                url: "subjects",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Subject"],
        }),
        deleteSubjectForTable: builder.mutation<void, string>({
            query: (subjectId) => ({
                url: `subjects/${subjectId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Subject"],
        }),
    }),
});

export const {
    useAddSubjectForTableMutation,
    useDeleteSubjectForTableMutation,
    useEvaluateSubjectMutation,
} = subjectApi;
