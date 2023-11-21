import { useEffect, ReactNode } from "react"
import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom"
import Auth from "../views/Auth"
import { useSelector } from "react-redux"
import { getToken } from "../services/authSlice"
import Posts from "../views/Posts"
import NotFound from "../views/NotFound"
import Post from "../views/Post"

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector(getToken)
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) navigate("/auth")
  }, [token, navigate])
  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/posts" />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/posts",
    element: (
      <PrivateRoute>
        <Posts />
      </PrivateRoute>
    ),
  },
  {
    path: '/posts/:postID',
    element: (
      <PrivateRoute>
        <Post />
      </PrivateRoute>
    )
  },
  {
    path: "*",
    element: (
      <PrivateRoute>
        <NotFound />
      </PrivateRoute>
    ),
  },
  
])

export default router
