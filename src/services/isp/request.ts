import {
    CreateRequestBody,
    EvaluateRequestBody,
    RequestResponse,
    RequestStatus,
    UpdateRequestBody,
} from "../../types/isp/Request";
import { ispApi } from "./api";

export const requestApi = ispApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRequests: builder.query<Array<RequestResponse>, void>({
            query: () => "requests",
            providesTags: ["Request"],
        }),
        getRequestsByUserId: builder.query<Array<RequestResponse>, string>({
            query: (userId) => `requests/user/${userId}`,
            providesTags: ["Request"],
        }),
        getRequestById: builder.query<RequestResponse, string>({
            query: (requestId) => `requests/${requestId}`,
            providesTags: ["Request"],
        }),
        createRequest: builder.mutation<RequestResponse, CreateRequestBody>({
            query: (body) => ({
                url: "requests",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Request"],
        }),
        updateRequest: builder.mutation<RequestResponse, UpdateRequestBody>({
            query: (body) => ({
                url: "requests",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Request"],
        }),
        evaluateRequest: builder.mutation<RequestStatus, EvaluateRequestBody>({
            query: (body) => ({
                url: "requests/evaluate",
                method: "PATCH",
                body,
            }),
        }),
        deleteRequest: builder.mutation<void, string>({
            query: (requestId) => ({
                url: `requests/${requestId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Request"],
        }),
    }),
});

export const {
    useGetAllRequestsQuery,
    useGetRequestByIdQuery,
    useGetRequestsByUserIdQuery,
    useCreateRequestMutation,
    useUpdateRequestMutation,
    useEvaluateRequestMutation,
    useDeleteRequestMutation,
} = requestApi;
