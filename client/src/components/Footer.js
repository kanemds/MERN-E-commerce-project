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

const STICKY = styled(Box)(({ theme }) => ({
  position: 'fixed'
}))


const Bottom = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

// const DASH_REGEX = /^\/dash(\/)?$/

const Footer = () => {

  const { pathname } = useLocation()

  const { username, status } = useAuth()


  return (
    <Box sx={{ width: '100%' }}>
      {
        username && pathname.includes('/dash') ?
          <STICKY sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '80px', width: '100%', borderTop: 3, borderColor: 'primary.main', backgroundColor: 'white' }}>
            <Typography variant='h5' sx={{ ml: 2 }}>Status: {status} </Typography>
            <Typography sx={{ ml: 3, mr: 3 }}>|</Typography>
            <Typography variant='h5'> User Name: {username}</Typography>
          </STICKY>
          :
          pathname === '/' ?
            <Box sx={{ flexGrow: 1, height: '250px', width: '100%', borderTop: 3, borderColor: 'primary.main', backgroundColor: 'white' }}>
              <Grid container sx={{ m: 2 }}>
                <Bottom xs={4} >
                  <Item ><Typography variant='h5'>Address</Typography></Item>
                  <Item>
                    <Typography variant='h6'>

                      K Book Shop <br />
                      (604) 888-8888 <br />
                      555 Foo Drive <br />
                      Vancouver, B.C <br />
                    </Typography>
                  </Item>
                </Bottom>
                <Bottom xs={4} >
                  <Item><Typography variant='h5'>Week Days Hours</Typography></Item>
                  <Item >
                    <Typography variant='h6'>
                      Monday 9AM - 8PM <br />
                      Tuesday 9AM - 8PM <br />
                      Wednesday 9AM - 8PM <br />
                      Thursday 9AM - 8PM <br />
                      Friday 9AM - 6PM <br />
                    </Typography>
                  </Item>
                </Bottom>
                <Bottom xs={4} >
                  <Item ><Typography variant='h5'>Weekend Hours</Typography></Item>
                  <Item >
                    <Typography variant='h6'>
                      Saturday 9AM - 6PM <br />
                      Sunday 9AM - 8PM <br />
                    </Typography>
                  </Item>
                </Bottom>
              </Grid>
            </Box >
            :
            ''
      }
    </Box >)
}

export default Footer