import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "not-authenticated", // "checking" | "authenticated" | "not-authenticated"
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, action) => {
            state.status = "authenticated";
        },
        logout: (state, action) => {},
        checkingCrendentials: (state) => {
            state.status = "checking";
        },
        wrongCredentials: (state, action) => {
            state.status = "not-authenticated";
            state.errorMessage = action.payload;
        },
    },
});
export const { login, logout, checkingCrendentials, wrongCredentials } = authSlice.actions;
