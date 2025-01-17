import { EvaluateTableBody, TableResponse, TableStatus } from '../../types/isp/Table';
import { ispApi } from '../api';

export const tableApi = ispApi.injectEndpoints({
    endpoints: (builder) => ({
        getTable: builder.query<TableResponse, string>({
            query: (tableId) => `tables/${tableId}`,
            providesTags: ['Table'],
        }),
        evaluateTable: builder.mutation<{ tableStatus: TableStatus }, EvaluateTableBody>({
            query: ({ tableId, evaluationStatus }) => ({
                url: `tables/${tableId}/evaluate`,
                method: 'PATCH',
                body: { evaluationStatus },
            }),
            invalidatesTags: ['Table'],
        }),
    }),
});

export const { useGetTableQuery, useEvaluateTableMutation } = tableApi;
