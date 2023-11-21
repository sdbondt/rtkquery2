import { useSelector } from "react-redux"
import { getToken } from "../services/authSlice"
import jwtDecode from "jwt-decode"

interface JWTPayload {
    userId: string
}

const useUserID = () => {
    const token = useSelector(getToken)
    if(!token) return null
    const payload = jwtDecode(token) as JWTPayload
    return payload.userId
}

export default useUserID