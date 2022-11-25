
import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Footer from "./Footer"
import Navbar from "./Navbar"
import { Container } from "@mui/system"

const Wrapper = styled(Container)(() => ({
  minHeight: '70vh',
  minWidth: '95vw'
}))


const Layout = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  )
}

export default Layout