// Redux
import { useSelector } from "react-redux"
// Router
import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRouteAuth() {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser && currentUser.isVerified ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  )
}

// export default function PrivateRouteAuth({ children }) {
//   const { currentUser } = useSelector((state) => state.user)
//   return currentUser ? children : <Navigate to="/sign-in" />
// }
