import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import { api } from '../services/api';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['api/executeQuery/fulfilled'],
                ignoredPaths: ['api.queries'],
            },
        }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
