import React from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Toolbar, Typography, Button, IconButton, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Typography variant="h6" component="div">
              <Link href='/' underline='none' color='white'>K Reparis</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ ml: 2 }} >
              <Link href='/dash' underline='none' color='white'> Dash Board</Link>
            </Typography>
          </Box>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar