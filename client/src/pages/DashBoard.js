
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
      <Link href='/dash/notes' underline='none'>View Notes</Link>
      <Link href='/dash/users' underline='none'>View Users</Link>
    </Box>
  )
}

export default DashBoard