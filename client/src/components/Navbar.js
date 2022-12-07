import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Toolbar, Typography, Button, IconButton, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { useUserLogoutMutation } from '../pages/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const Navbar = () => {

  const { username, status } = useAuth()

  const navigate = useNavigate()
  const [userLogut, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUserLogoutMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>{error.data?.message}</Typography>

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Typography variant="h6" component="div">
              <Link to='/' component={RouterLink} underline='none' color='white'>K Reparis</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ ml: 2 }} >
              <Link to='/dash' component={RouterLink} underline='none' color='white'> Dash Board</Link>
            </Typography>
          </Box>
          {username ?
            <Button color="inherit" onClick={() => userLogut()}>Logout</Button>
            :
            <Box>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </Box>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar