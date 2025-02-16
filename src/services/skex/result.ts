import { api } from '../api';

export const resultApi = api.injectEndpoints({
    endpoints: (builder) => ({
        loadResults: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: 'skex/results',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useLoadResultsMutation } = resultApi;
