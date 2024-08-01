// Redux
import { useSelector } from "react-redux"
// Router
import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRouteAdmin() {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser && currentUser.isVerified && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  )
}

// export default function PrivateRouteAdmin({ children }) {
//   const { currentUser } = useSelector((state) => state.user)
//   return currentUser && currentUser.isAdmin ? (
//     children
//   ) : (
//     <Navigate to="/sign-in" />
//   )
// }
