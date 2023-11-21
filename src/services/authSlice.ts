import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

export interface AuthState {
    token: string | null
}

const initialState: AuthState = {
    token: localStorage.getItem('token') || null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state: AuthState, { payload }) => {
            state.token = payload
            localStorage.setItem('token', payload)
        },
        logout: (state: AuthState) => {
            state.token = null
            localStorage.removeItem('token')
        }
    }
})


const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            })
        })
    })
})

export const { setToken, logout } = authSlice.actions
export const getToken = (state: { auth: AuthState }) => state.auth.token

export const { useSignupMutation, useLoginMutation } = extendedApiSlice

export default authSlice.reducer