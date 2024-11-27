import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../config/store';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    id: string | null;
    token: string | null;
    role: 'P' | 'D' | 'S' | 'N' | null;
    initials: string | null;
}

const initialState: UserState = {
    id: null,
    role: null,
    token: null,
    initials: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setRole: (state, action: PayloadAction<'P' | 'D' | 'S' | 'N'>) => {
            state.role = action.payload;
        },
        setInitials: (state, action: PayloadAction<string>) => {
            state.initials = action.payload;
        },
    },
});

export const { setRole, setToken, setId, setInitials } = userSlice.actions;
export const selectToken = (state: RootState) => state.user.token;
export const selectRole = (state: RootState) => state.user.role;
export const selectId = (state: RootState) => state.user.id;
export const selectInitials = (state: RootState) => state.user.initials;
export default userSlice.reducer;
