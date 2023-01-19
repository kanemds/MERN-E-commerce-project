
import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Footer from './Footer'
import Navbar from './Navbar'
import { Container } from "@mui/system"
import { Box } from '@mui/material'
import useAuth from '../hooks/useAuth'
import { useLocation } from 'react-router-dom'

// const DASH_REGEX = /^\/dash(\/)?$/

const Layout = () => {

  const { pathname } = useLocation()

  const { isEmployee, isManager, isAdmin } = useAuth()

  const WrapperCustomer = styled(Container)(() => ({
    marginTop: '180px',
    height: 'calc(100% - 180px)',
    width: '100%',
  }))

  const WrapperUser = styled(Container)(() => ({
    marginTop: '180px',
    height: 'calc(100% - 180px)',
    width: '100%'
  }))

  // this will have a fixed footer when scrolling
  // footer {
  //   position:fixed;
  //   bottom:0;
  //   width:100%
  // }


  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {isEmployee && pathname.includes('/dash') || isManager && pathname.includes('/dash') || isAdmin && pathname.includes('/dash') ?

          <WrapperUser>
            <Outlet />
          </WrapperUser>
          :
          <WrapperCustomer>
            <Outlet />
          </WrapperCustomer>
        }
        <Box sx={{ marginTop: 'auto' }}>
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Layout