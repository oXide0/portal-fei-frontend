import { configureStore } from "@reduxjs/toolkit";
import { ispApi } from "../services/isp";
import userReducer from "../features/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [ispApi.reducerPath]: ispApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ispApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
