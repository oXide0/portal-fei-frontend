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
        }),
        deleteSubjectForTable: builder.mutation<void, string>({
            query: (subjectId) => ({
                url: `subjects/${subjectId}`,
                method: "DELETE",
            }),
        }),
    }),
});
