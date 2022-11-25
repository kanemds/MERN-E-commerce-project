
import React from 'react'
import { Box, Link } from '@mui/material'





const DashBoard = () => {
  return (
    <Box>
      <Link href='/dash/notes' underline='none'>View Notes</Link>
      <Link href='/dash/users' underline='none'>View Users</Link>
    </Box>
  )
}

export default DashBoard