import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Toolbar, Typography, Button, Link, IconButton } from '@mui/material'
// icons
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import DescriptionIcon from '@mui/icons-material/Description'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
//
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { useUserLogoutMutation } from '../pages/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const Navbar = () => {

  const { username, isManager, isAdmin } = useAuth()

  const navigate = useNavigate()
  const { pathname } = useLocation()


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

  const toNewNote = () => navigate('/dash/notes/new')
  const toNotes = () => navigate('/dash/notes')
  const toNewUser = () => navigate('/dash/users/new')
  const toUsers = () => navigate('/dash/users')



  let newNoteButton = null
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <IconButton aria-label="New Note" onClick={toNewNote} >
        <NoteAddIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }

  let newUserButton = null
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <IconButton aria-label="New Note" onClick={toNewUser} >
        <PersonAddIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }

  let usersButton = null
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      usersButton = (
        <IconButton aria-label="All Users" onClick={toUsers} >
          <PeopleAltIcon sx={{ color: 'white' }} />
        </IconButton>
      )
    }
  }

  let notesButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <IconButton aria-label="All Notes" onClick={toNotes} >
        <DescriptionIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }


  if (isError) return <Typography>{error.data?.message}</Typography>

  let buttonContent
  if (isLoading) {
    return <Typography>Loading...</Typography>
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {notesButton}
        {newUserButton}
        {usersButton}
      </>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Typography variant="h6" >
              <Link to='/' component={RouterLink} underline='none' color='white'>K Reparis</Link>
            </Typography>
            {username ?
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ ml: 2, mr: 2 }}>|</Typography>
                <Typography variant="h6"  >
                  <Link to='/dash' component={RouterLink} underline='none' color='white'> Dash Board</Link>
                </Typography>
              </Box>
              : ''}

          </Box>
          {username ?
            <Box>
              {buttonContent}
              <Button color="inherit" onClick={() => userLogut()}>Logout</Button>
            </Box>
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