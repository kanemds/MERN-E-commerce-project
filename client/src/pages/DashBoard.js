
import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'



const DashBoard = () => {

  const { username, isManager, isAdmin } = useAuth()

  const date = new Date()
  const optionOne = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }
  const optionTwo = {
    dateStyle: 'full', timeStyle: 'long'
  }

  const currentTime = new Intl.DateTimeFormat('en-US', optionOne).format(date)

  return (
    <Box>
      <Typography variant='h5'>{currentTime}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Link to='/dash/notes' component={RouterLink} underline='none'>View Notes</Link>
        <Link to='/dash/notes/new' component={RouterLink} underline='none'>create new note</Link>
        {(isManager || isAdmin) &&
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link to='/dash/users' component={RouterLink} underline='none'>View Users</Link>
            <Link to='/dash/users/new' component={RouterLink} underline='none'>create new user</Link>
            <Link to='/dash/books' component={RouterLink} underline='none'>View Books</Link>
            <Link to='/dash/books/new' component={RouterLink} underline='none'>create new book</Link>
          </Box>
        }
      </Box>
    </Box>
  )
}

export default DashBoard