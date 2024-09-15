import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../config/store";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const ispApi = createApi({
    reducerPath: "ispApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: ["Request", "Subject", "Table"],
});
