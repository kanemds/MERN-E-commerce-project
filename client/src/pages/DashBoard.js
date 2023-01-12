
import React from 'react'
import { Box, Link, Typography, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { styled } from '@mui/material/styles'

const Container = styled(Paper)(({ theme }) => ({
  minHeight: '250px',
  minWidth: '250px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 20,
  borderRadius: '20%',
  ":hover": {
    minHeight: '300px',
    minWidth: '300px',
    backgroundColor: 'Lightgrey'
  }
}))


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
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h5'>{currentTime}</Typography>

      {!isManager && !isAdmin ?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', minWidth: '400px' }}>
          <Container >
            <Link to='/dash/notes' component={RouterLink} underline='none' sx={{ m: 3 }}>View Notes</Link>
            <Link to='/dash/notes/new' component={RouterLink} underline='none' sx={{ m: 3 }}>create new note</Link>
          </Container>
        </Box>
        :
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', minWidth: '400px' }}>
          <Container >
            <Link to='/dash/notes' component={RouterLink} underline='none' sx={{ m: 3 }}>View Notes</Link>
            <Link to='/dash/notes/new' component={RouterLink} underline='none' sx={{ m: 3 }}>create new note</Link>
          </Container>
          <Container>
            <Link to='/dash/users' component={RouterLink} underline='none' sx={{ m: 3 }}>View Users</Link>
            <Link to='/dash/users/new' component={RouterLink} underline='none' sx={{ m: 3 }}>create new user</Link>
          </Container>
          <Container>
            <Link to='/dash/books' component={RouterLink} underline='none' sx={{ m: 3 }}>View Books</Link>
            <Link to='/dash/books/new' component={RouterLink} underline='none' sx={{ m: 3 }}>create new book</Link>
          </Container>
          <Container>
            <Link to='/dash/orders' component={RouterLink} underline='none' sx={{ m: 3 }}>View Orders</Link>
          </Container>
        </Box>
      }

    </Box>
  )
}

export default DashBoard