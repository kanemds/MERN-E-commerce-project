
import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Footer from './Footer'
import Navbar from './Navbar'
import { Container } from "@mui/system"
import useAuth from '../hooks/useAuth'



const Layout = () => {

  const { username, status } = useAuth()


  const WrapperCustomer = styled(Container)(() => ({
    minHeight: '70vh',
    minWidth: '95vw'

  }))

  const WrapperUser = styled(Container)(() => ({
    minHeight: '90vh',
    minWidth: '95vw'

  }))


  return (
    <>
      <Navbar />
      {username && status ?
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