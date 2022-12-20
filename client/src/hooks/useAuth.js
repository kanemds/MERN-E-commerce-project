import { useSelector } from "react-redux"
import { selectCurrentToken } from "../pages/auth/authSlice"
import jwtDecode from 'jwt-decode'


const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManager = false
  let isAdmin = false
  let isEmployee = false
  let status = 'Customer'

  if (token) {
    const decode = jwtDecode(token)
    const { username, roles } = decode.UserInfo // from backend jwt 

    isEmployee = roles.includes('Employee')
    isManager = roles.includes('Manager')
    isAdmin = roles.includes('Admin')

    if (isEmployee) status = 'Employee'
    if (isManager) status = 'Manager'
    if (isAdmin) status = 'Admin'

    return { username, roles, status, isEmployee, isManager, isAdmin }
  }


  return { username: '', roles: [], status, isEmployee, isManager, isAdmin }
}

export default useAuth