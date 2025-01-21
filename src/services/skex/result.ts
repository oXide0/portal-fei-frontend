import { UploadResultBody } from '@/types/skex/Result';
import { api } from '../api';

export const resultApi = api.injectEndpoints({
    endpoints: (builder) => ({
        loadResults: builder.mutation<void, UploadResultBody>({
            query: ({ examType, resultsFile }) => ({
                url: 'skex/results',
                method: 'POST',
                body: {
                    resultsFile,
                    examType,
                },
            }),
        }),
    }),
});

export const { useLoadResultsMutation } = resultApi;
