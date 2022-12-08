
import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Footer from './Footer'
import Navbar from './Navbar'
import { Container } from "@mui/system"
import useAuth from '../hooks/useAuth'
import { useLocation } from 'react-router-dom'

// const DASH_REGEX = /^\/dash(\/)?$/

const Layout = () => {

  const { pathname } = useLocation()

  const { username, status } = useAuth()

  const WrapperCustomer = styled(Container)(() => ({
    minHeight: '78vh',
    minWidth: '95vw'

  }))

  const WrapperUser = styled(Container)(() => ({
    minHeight: '90vh',
    minWidth: '95vw'

  }))


  return (
    <>
      <Navbar />
      {username && pathname.includes('/dash') ?
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