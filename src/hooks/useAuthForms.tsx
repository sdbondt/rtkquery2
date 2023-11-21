import { useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  setToken,
  useLoginMutation,
  useSignupMutation,
} from "../services/authSlice"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { SerializedError } from "@reduxjs/toolkit"

type AuthType = "login" | "signup"
interface AuthState {
  email: string
  name?: string
  password: string
  confirmPassword?: string
}

interface CredentialsAction {
  email?: string
  name?: string
  password?: string
  confirmPassword?: string
}

const credentialsReducer = (state: AuthState, action: CredentialsAction) => ({
  ...state,
  ...action,
})

const useAuthForms = (type: AuthType, initialState: AuthState) => {
  const [credentials, dispatchCredentials] = useReducer(
    credentialsReducer,
    initialState
  )
  const [
    login,
    { error: loginError, isError: isLoginError, isLoading: isLoginLoading },
  ] = useLoginMutation()
  const [
    signup,
    { error: signupError, isError: isSignupError, isLoading: isSignupLoading },
  ] = useSignupMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatchCredentials({ [e.target.name]: e.target.value })

  // use rtkq method based on type, if succesful set jwt token and navigate to home page
  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let res:
      | { data?: { token: string } }
      | { error: FetchBaseQueryError | SerializedError } = {}

    if (type === "login") {
      res = await login(credentials)
    }
    if (type === "signup") {
      res = await signup(credentials)
    }

    if ("data" in res && res.data) {
      dispatch(setToken(res.data.token))
      navigate("/")
    }
  }

  return {
    credentials,
    handleChanges,
    handleAuth,
    login,
    signup,
    isLoginError,
    isLoginLoading,
    loginError,
    signupError,
    isSignupError,
    isSignupLoading,
  }
}

export default useAuthForms
