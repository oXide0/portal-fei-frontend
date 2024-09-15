import {
    EvaluateTableBody,
    TableResponse,
    TableStatus,
} from "../../types/isp/Table";
import { ispApi } from "./api";

export const tableApi = ispApi.injectEndpoints({
    endpoints: (builder) => ({
        getTable: builder.query<TableResponse, string>({
            query: (tableId) => `tables/${tableId}`,
        }),
        evaluateTable: builder.mutation<TableStatus, EvaluateTableBody>({
            query: (body) => ({
                url: "tables/evaluate",
                method: "PATCH",
                body,
            }),
        }),
    }),
});

export const { useGetTableQuery, useEvaluateTableMutation } = tableApi;
