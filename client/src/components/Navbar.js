import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Toolbar, Typography, Button, Link, IconButton } from '@mui/material'
// icons
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import DescriptionIcon from '@mui/icons-material/Description'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
//
import LoadingMessage from './LoadingMessage'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { useUserLogoutMutation } from '../pages/auth/authApiSlice'
import useAuth from '../hooks/useAuth'


const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const BOOKS_REGEX = /^\/dash\/books(\/)?$/

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

  const toNewBook = () => navigate('/dash/books/new')
  const toBooks = () => navigate('/dash/books')



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

  let newBookButton = null
  if (BOOKS_REGEX.test(pathname)) {
    newBookButton = (
      <IconButton aria-label="New Book" onClick={toNewBook} >
        <BookmarkAddIcon sx={{ color: 'white' }} />
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

  let booksButton = null
  if (!BOOKS_REGEX.test(pathname) && pathname.includes('/dash')) {
    booksButton = (
      <IconButton aria-label="All Books" onClick={toBooks} >
        <BookmarksIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }


  if (isError) return <Typography>{error.data?.message}</Typography>

  let buttonContent
  if (isLoading) {
    return <LoadingMessage />
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {notesButton}
        {newUserButton}
        {usersButton}
        {newBookButton}
        {booksButton}
      </>
    )
  }

  return (

    <AppBar position="fixed" sx={{ height: '80px', width: '100vw', zindex: 9999, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>

      <Typography variant="h6" sx={{ ml: 3 }} >
        <Link to='/' component={RouterLink} underline='none' color='white'>K Book Shop</Link>
      </Typography>

      {username ?
        <Box >
          <Button color="inherit" onClick={() => navigate('/dash')}> Dash Board</Button>
          {buttonContent}
          <Button color="inherit" onClick={() => userLogut()}>Logout</Button>
        </Box>
        :
        <Box>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
        </Box>
      }

    </AppBar >


  )
}

export default Navbar