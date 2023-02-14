import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"


const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const { roles } = useAuth()

  const content = (
    roles.some(role => allowedRoles.includes(role))
      ? <Outlet />
      : <Navigate to='/login' state={{ from: location }} replace /> // if existing customer go to admin page will require login and hit back button the customer user still login
  )
  return content
}

export default RequireAuth