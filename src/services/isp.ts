import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ispApi = createApi({
    reducerPath: "ispApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.VITE_BASE_URL }),
    endpoints: (builder) => ({}),
});
