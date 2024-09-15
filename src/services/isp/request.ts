import {
    CreateRequestBody,
    RequestResponse,
    UpdateRequestBody,
} from "../../types/isp/Request";
import { ispApi } from "./api";

export const requestApi = ispApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRequests: builder.query<Array<RequestResponse>, void>({
            query: () => "requests",
        }),
        createRequest: builder.mutation<RequestResponse, CreateRequestBody>({
            query: (body) => ({
                url: "requests",
                method: "POST",
                body,
            }),
        }),
        updateRequest: builder.mutation<RequestResponse, UpdateRequestBody>({
            query: (body) => ({
                url: "requests",
                method: "PATCH",
                body,
            }),
        }),
        deleteRequest: builder.mutation<void, string>({
            query: (requestId) => ({
                url: `requests/${requestId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAllRequestsQuery,
    useCreateRequestMutation,
    useUpdateRequestMutation,
    useDeleteRequestMutation,
} = requestApi;
