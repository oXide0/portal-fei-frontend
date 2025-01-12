import {
    EvaluateRequestBody,
    RequestResponse,
    UpdateRequestResponse,
    RequestStatus,
    CreateRequestResponse,
} from '../../types/isp/Request';
import { ispApi } from './api';

export const requestApi = ispApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRequests: builder.query<Array<RequestResponse>, void>({
            query: () => 'requests',
            providesTags: ['Request'],
        }),
        getRequestsByUserId: builder.query<Array<RequestResponse>, string>({
            query: (userId) => `requests/users/${userId}`,
            providesTags: ['Request'],
        }),
        getRequestById: builder.query<RequestResponse, string>({
            query: (requestId) => `requests/${requestId}`,
            providesTags: ['Request'],
        }),
        createRequest: builder.mutation<CreateRequestResponse, FormData>({
            query: (formData) => ({
                url: 'requests',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Request'],
        }),
        updateRequest: builder.mutation<UpdateRequestResponse, { data: FormData; requestId: string }>({
            query: ({ data, requestId }) => ({
                url: `requests/${requestId}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Request'],
        }),
        evaluateRequest: builder.mutation<{ requestStatus: RequestStatus }, EvaluateRequestBody>({
            query: ({ requestId, evaluationStatus }) => ({
                url: `requests/${requestId}/evaluate`,
                method: 'POST',
                body: { evaluationStatus },
            }),
        }),
        deleteRequest: builder.mutation<void, string>({
            query: (requestId) => ({
                url: `requests/${requestId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Request'],
        }),
        downloadFile: builder.query<Blob, string>({
            query: (attachmentUrl) => ({
                url: `requests/attachment/download?attachmentUrl=${encodeURIComponent(attachmentUrl)}`,
                method: 'GET',
                responseHandler: (response) => response.blob(),
            }),
            providesTags: ['Request'],
        }),
        generateDocument: builder.query<Blob, string>({
            query: (requestId) => ({
                url: `requests/${requestId}/generate`,
                method: 'GET',
                responseHandler: (response) => response.blob(),
            }),
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
    useLazyDownloadFileQuery,
    useLazyGenerateDocumentQuery,
} = requestApi;
