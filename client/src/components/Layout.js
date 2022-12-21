
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

  const WrapperCustomer = styled(Box)(() => ({
    marginTop: '80px',
    height: '100%',
    width: '100%',
  }))

  const WrapperUser = styled(Box)(() => ({
    marginTop: '80px',
    height: '100%',
    width: '100%'

  }))


  return (
    <>
      <Navbar />
      {isEmployee && pathname.includes('/dash') || isManager && pathname.includes('/dash') || isAdmin && pathname.includes('/dash') ?
        <WrapperUser>
          <Outlet />
        </WrapperUser>
        :
        <WrapperCustomer>
          <Outlet />
        </WrapperCustomer>
      }
      <Footer />
    </>
  )
}

export default Layout