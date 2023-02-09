import React, { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation, useGetUsersQuery } from '../users/usersApiSlice'
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom'
import { Paper, Box, Button, TextField, Typography, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Switch } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'



// included
const USER_REGEX = /^[a-zA-Z0-9-_.]{3,24}$/
// required type
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/

const EMAIL_REGEX = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/


const EditCustomer = () => {

  const { id } = useParams()



  const navigate = useNavigate()

  const { currentUser } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      currentUser: data?.entities[id]
    })
  })

  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateUserMutation()

  const [deleteUser, {
    isSuccess: isDeletedSuccess,
    isError: isDeletedError,
    error: deletedError
  }] = useDeleteUserMutation()

  const [username, setUsername] = useState(currentUser.username)
  const [validUsername, setValidUsername] = useState(false)

  const [show, setShow] = useState(false)

  const [email, setEmail] = useState(currentUser.email)
  const [validEmail, setValidEmail] = useState('')

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)

  const [comfirm, setComfirm] = useState('')
  const [isMatch, setIsMatch] = useState(false)


  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    const match = comfirm === password
    setIsMatch(match)
  }, [comfirm, password])

  useEffect(() => {
    if (isSuccess || isDeletedSuccess) {
      setUsername('')
      setPassword('')
      navigate('/')
    }
  }, [isSuccess, isDeletedSuccess, navigate])


  const handleUpdate = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateUser({ id: currentUser.id, username, email, password })
    } else {
      await updateUser({ id: currentUser.id, username, email })
    }
  }

  const handleShow = () => {
    setShow(prev => !prev)
  }

  const handleDelete = async () => {
    await deleteUser({ id: currentUser.id })
    navigate('/')
  }

  let canSave
  if (password) {
    canSave = [validUsername, validPassword, isMatch].every(Boolean) && !isLoading
  } else {
    canSave = [validUsername].every(Boolean) && !isLoading
  }



  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {error || deletedError ?
        <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message || deletedError?.data.message}</Typography>
        </Paper>
        :
        <Paper sx={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ p: 3 }} >Edit User</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='User Name' variant='outlined' required sx={{ m: 3 }}
            value={username} onChange={e => setUsername(e.target.value)}
          />
          {validUsername || username.length === 0 ? "" : <Typography>User Name must be 3 to 24 characters(Letters and Numbers only) </Typography>}

          <TextField fullWidth autoComplete='off' type='email' label='Email' variant='outlined' required sx={{ m: 3 }}
            value={email} onChange={e => setEmail(e.target.value)}
          />
          {validEmail || email.length === 0 ? "" : <Typography>Invalidate Email </Typography>}

          <Button variant="contained" onClick={handleShow} sx={{ m: 1 }}>Password Update</Button>
          {!show ? '' :
            <>
              <TextField fullWidth autoComplete='off' type='password' label='Password' variant='outlined' required sx={{ m: 3 }}
                onChange={e => setPassword(e.target.value)}
              />

              {validPassword || password.length === 0 ? "" : <Typography>Invalided Password</Typography>}
              <TextField fullWidth autoComplete='off' type='password' label='Password Comfirm' variant='outlined' required sx={{ m: 3 }}
                onChange={e => setComfirm(e.target.value)}
              />
              {isMatch || comfirm.length === 0 ? "" : <Typography>Please match with password</Typography>}
              <Typography variant='h8' sx={{ maxWidth: 300 }}>Password required: one number and one "!,@,#,$,%" special charater </Typography>

            </>
          }

          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid xs={4} sm={4} md={4}>
                <Button variant="contained" disabled={!canSave} onClick={handleUpdate} >Update</Button>
              </Grid>
              <Grid xs={4} sm={4} md={4}>
                <Button variant="contained" onClick={handleDelete} >Delete</Button>
              </Grid>
              <Grid xs={4} sm={4} md={4}>
                <Button variant="contained" ><Link to='/dash/users' component={RouterLink} underline="none" color='white' >Cancel</Link></Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      }
    </Box >
  )

  return content
}


export default EditCustomer