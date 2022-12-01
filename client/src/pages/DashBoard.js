
import React from 'react'
import { Box, Link } from '@mui/material'





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
        <Link href='/dash/notes' underline='none'>View Notes</Link>
        <Link href='/dash/notes/new' underline='none'>create new note</Link>
        <Link href='/dash/users' underline='none'>View Users</Link>
        <Link href='/dash/users/new' underline='none'>create new user</Link>
      </Box>
    </Box>
  )
}

export default DashBoard