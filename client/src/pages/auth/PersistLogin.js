import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import { Box, Link, Typography } from '@mui/material'
import LoadingMessage from '../../components/LoadingMessage'

const CARTS_REGEX = /^\/carts(\/)?$/

const PersistLogin = () => {

  const [persist] = usePersist()
  const { pathname } = useLocation()

  const token = useSelector(selectCurrentToken)

  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
    isUninitialized, // check if it has been called
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()


  // https://www.youtube.com/watch?v=81faZzp18NM resource

  useEffect(() => {
    // prevent strict mode run twice
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        console.log('Verifying refresh token')
        try {
          const { data } = await refresh()

          setTrueSuccess(true)
        } catch (error) {
          console.log(error)
        }
      }
      if (!token && persist) verifyRefreshToken() // refresh cause state [], this will get the refresh token again
    }
    return () => effectRan.current = true // first run to false and set(true) prevent run twice
  }, [])


  let content

  if (!persist || CARTS_REGEX.test(pathname)) {
    content = <Outlet />
  } else if (isLoading) { // persist && !token
    content = <LoadingMessage />
  } else if (isError) { // persist && !token
    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>{error.data?.message}</Typography>
        <Link to='/' component={RouterLink} underline="none" >Back To Home Page</Link>
      </Box>
    )
  } else if (isSuccess && trueSuccess || CARTS_REGEX.test(pathname)) { // persist && token
    content = <Outlet />
  } else if (token && isUninitialized || CARTS_REGEX.test(pathname)) { // persist && token
    console.log('token and uninit')
    console.log(isUninitialized)
    content = < Outlet />
  }

  return content
}

export default PersistLogin