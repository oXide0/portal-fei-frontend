import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import { ispApi } from '../services/isp/api';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [ispApi.reducerPath]: ispApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['ispApi/executeQuery/fulfilled'],
                ignoredPaths: ['ispApi.queries'],
            },
        }).concat(ispApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
