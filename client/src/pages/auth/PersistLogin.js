import { Outlet, Link as RouterLink } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import { Box, Link, Typography } from '@mui/material'


const PersistLogin = () => {

  const [persist] = usePersist()

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
          console.log(data)
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

  if (!persist) {
    console.log('No Persist')
    content = <Outlet />
  } else if (isLoading) { // persist && !token
    content = <Typography>Loading...</Typography>
  } else if (isError) { // persist && !token
    content = (
      <Box>
        <Typography>{error.data?.message}</Typography>
        <Link to='/' component={RouterLink} underline="none" >Please Try Again</Link>
      </Box>
    )
  } else if (isSuccess && trueSuccess) { // persist && token
    content = <Outlet />
  } else if (token && isUninitialized) { // persist && token
    console.log('token and uninit')
    console.log(isUninitialized)
    content = < Outlet />
  }

  return content
}

export default PersistLogin