import { EvaluateTableBody, TableResponse, TableStatus } from '../../types/isp/Table';
import { api } from '../api';

export const tableApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTable: builder.query<TableResponse, string>({
            query: (tableId) => `isp/tables/${tableId}`,
            providesTags: ['Table'],
        }),
        evaluateTable: builder.mutation<{ tableStatus: TableStatus }, EvaluateTableBody>({
            query: ({ tableId, evaluationStatus }) => ({
                url: `isp/tables/${tableId}/evaluate`,
                method: 'POST',
                body: { evaluationStatus },
            }),
            invalidatesTags: ['Table'],
        }),
    }),
});

export const { useGetTableQuery, useEvaluateTableMutation } = tableApi;
