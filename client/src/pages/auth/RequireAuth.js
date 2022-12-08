import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"


const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const { roles } = useAuth()

  const content = (
    roles.some(role => allowedRoles.includes(role))
      ? <Outlet />
      : <Navigate to='/login' state={{ from: location }} replace /> // repalce:for login user when log out,  the back button will redirect to previous page with data, instead of login page again
  )
  return content
}

export default RequireAuth