import { configureStore } from "@reduxjs/toolkit"
import { api } from "../services/api"
import authReducer from "../services/authSlice"
import postReducer from '../services/postsSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    posts: postReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = {
  auth: {
    token: string
  }
}
