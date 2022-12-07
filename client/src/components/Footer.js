import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2'
import useAuth from '../hooks/useAuth'
import { useLocation } from 'react-router-dom'

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  // color: theme.palette.text.secondary,
}))

const Bottom = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

const DASH_REGEX = /^\/dash(\/)?$/

const Footer = () => {

  const { pathname } = useLocation()

  const { username, status } = useAuth()


  return (
    <>
      {
        username && status && DASH_REGEX.test(pathname) ?
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '5vh', borderTop: 3, borderColor: 'primary.main' }}>
            <Typography variant='h5' sx={{ ml: 2 }}>Status: {status} </Typography>
            <Typography sx={{ ml: 3, mr: 3 }}>|</Typography>
            <Typography variant='h5'> User Name: {username}</Typography>
          </Box>
          :
          <Box sx={{ flexGrow: 1, height: '15vh', borderTop: 3, borderColor: 'primary.main' }
          } >
            <Grid container  >
              <Bottom xs={6} >
                <Item sx={{ mt: 1 }}><Typography variant='h6'>Address</Typography></Item>
                <Item>
                  K Reparis <br />
                  (604) 888-8888 <br />
                  555 Foo Drive <br />
                  Vancouver, B.C <br />
                </Item>
              </Bottom>
              <Bottom xs={6} >
                <Item sx={{ mt: 1 }}><Typography variant='h6'>Hours</Typography></Item>
                <Item >
                  Sunday 9AM - 6PM <br />
                  Monday 9AM - 6PM <br />
                  Tuesday 9AM - 6PM <br />
                  Wednesday 9AM - 6PM <br />
                  Thursday 9AM - 6PM <br />
                  Friday 9AM - 6PM <br />
                  Saturday 9AM - 6PM <br />
                </Item>
              </Bottom>
            </Grid>
          </Box >
      }
    </>
  )
}

export default Footer