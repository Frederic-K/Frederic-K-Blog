// Router
import { Outlet, Navigate } from "react-router-dom"
// Redux
import { useSelector } from "react-redux"

export default function PrivateRouteNoAuth() {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser ? <Navigate to="/" /> : <Outlet />
}
