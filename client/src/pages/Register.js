import React, { useState, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Paper, Box, Button, TextField, Typography, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { useAddNewUserMutation } from './users/usersApiSlice'




// included
const USER_REGEX = /^[a-zA-Z0-9-_.]{3,24}$/
// required type
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/

const EMAIL_REGEX = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const Register = () => {

  const [
    addNewCustomer, {
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useAddNewUserMutation()



  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [comfirm, setComfirm] = useState("")
  const [isMatch, setIsMatch] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState('')



  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [validPassword])

  useEffect(() => {
    const match = comfirm === password
    setIsMatch(match)
  }, [comfirm, password])



  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setEmail('')
      setPassword('')
      navigate('/')
    }
  }, [isSuccess, navigate])




  const canSave = [validUsername, validEmail, validPassword, isMatch].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewCustomer({ username, email, password })
    }
  }

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {error ?
        <Paper sx={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
        </Paper>
        :
        <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ p: 3 }} >Register New User</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='User Name' variant='outlined' required sx={{ m: 3 }}
            onChange={e => setUsername(e.target.value)}
          />
          {validUsername || username.length === 0 ? "" : <Typography>User Name must be 3 to 24 characters(Letters and Numbers only) </Typography>}

          <TextField fullWidth autoComplete='off' type='text' label='Email' variant='outlined' required sx={{ m: 3 }}
            onChange={e => setEmail(e.target.value)}
          />
          {validEmail || email.length === 0 ? "" : <Typography>Invalided Email Entry</Typography>}

          <TextField fullWidth autoComplete='off' type='password' label='Password' variant='outlined' required sx={{ m: 3 }}
            onChange={e => setPassword(e.target.value)}
          />

          {validPassword || password.length === 0 ? "" : <Typography>Invalided Password</Typography>}
          <TextField fullWidth autoComplete='off' type='password' label='Password Comfirm' variant='outlined' required sx={{ m: 3 }}
            onChange={e => setComfirm(e.target.value)}
          />
          {isMatch || comfirm.length === 0 ? "" : <Typography>Please match with password</Typography>}



          <Box sx={{ m: 3 }}>
            <Button variant="contained" disabled={!canSave} onClick={handleSubmit} sx={{ mr: 3 }}>Submit</Button>
            <Button variant="contained" ><Link to='/' component={RouterLink} underline="none" color='white'>Cancel</Link></Button>
          </Box>
          <Typography variant='h8' >Note: Password required: one number and one "!,@,#,$,%" special charater </Typography>
        </Paper>
      }

    </Box >
  )

  return content
}

export default Register