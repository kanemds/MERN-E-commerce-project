import React, { useState, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './auth/authSlice'
import { useLoginMutation } from './auth/authApiSlice'
import { Paper, Box, Button, TextField, Typography, Link, Checkbox } from '@mui/material'
import usePersist from '../hooks/usePersist'
import LoadingMessage from '../components/LoadingMessage'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [persist, setPersist] = usePersist()

  useEffect(() => {
    setError('')
  }, [username, password])

  if (isLoading) return <LoadingMessage />

  const canSave = [username.length, password.length].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (canSave) {
        const { accessToken } = await login({ username, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setUsername('')
        setPassword('')
        navigate('/')
      }
    } catch (error) {
      if (!error.status) {
        setError('No Server Response')
      } else if (error.status === 400) {
        setError('Missing User Name or Password')
      } else if (error === 401) {
        setError('Unauthorized')
      } else {
        setError(error.data?.message)
      }
    }

  }

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Paper sx={{ width: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Typography variant='h5' sx={{ p: 3 }} >Login</Typography>
        <Typography>{error}</Typography>
        <TextField fullWidth autoComplete='off' type='text' label='User Name' variant='outlined' required sx={{ m: 3 }}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField fullWidth autoComplete='off' type='Password' label='Password' variant='outlined' required sx={{ m: 3 }}
          onChange={e => setPassword(e.target.value)}
        />

        <Box sx={{ m: 3 }}>
          <Button disabled={!canSave} onClick={handleSubmit} >Log In</Button>
          <Button><Link to='/' component={RouterLink} underline="none" >Cancel</Link></Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>Trust This Device</Typography>
          <Checkbox checked={persist} onChange={() => setPersist(prev => !prev)} />
        </Box>
      </Paper>
    </Box >
  )

  return content
}

export default Login