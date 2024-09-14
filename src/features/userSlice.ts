import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../config/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    token: string | null;
    role: "P" | "D" | "S" | "N" | null;
}

const initialState: UserState = {
    role: null,
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setRole: (state, action: PayloadAction<"P" | "D" | "S" | "N">) => {
            state.role = action.payload;
        },
    },
});

export const { setRole, setToken } = userSlice.actions;
export const selectToken = (state: RootState) => state.user.token;
export const selectRole = (state: RootState) => state.user.role;
export default userSlice.reducer;
