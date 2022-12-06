
import React from 'react'
import { Box, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'




const DashBoard = () => {

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
      {currentTime}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Link to='/dash/notes' component={RouterLink} underline='none'>View Notes</Link>
        <Link to='/dash/notes/new' component={RouterLink} underline='none'>create new note</Link>
        <Link to='/dash/users' component={RouterLink} underline='none'>View Users</Link>
        <Link to='/dash/users/new' component={RouterLink} underline='none'>create new user</Link>
      </Box>
    </Box>
  )
}

export default DashBoard