import React, { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from '../users/usersApiSlice'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { Paper, Box, Button, TextField, Typography, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Switch } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'


// included
const USER_REGEX = /^[a-zA-Z0-9-_.]{3,24}$/
// required type
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/

const EMAIL_REGEX = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/


const EditUserForm = ({ currentUser }) => {

  const navigate = useNavigate()

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

  const [roles, setRoles] = useState(currentUser.roles)

  const [active, setActive] = useState(currentUser.active)

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
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, isDeletedSuccess, navigate])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setRoles(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const handleActive = (event) => {
    setActive(event.target.checked)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateUser({ id: currentUser.id, username, email, password, roles, active })
    } else {
      await updateUser({ id: currentUser.id, username, email, roles, active })
    }
  }

  const handleShow = () => {
    setShow(prev => !prev)
  }

  const handleDelete = async () => {
    await deleteUser({ id: currentUser.id })
  }

  let canSave
  if (password) {
    canSave = [roles.length, validUsername, validPassword, isMatch].every(Boolean) && !isLoading
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  }

  const options = (
    <FormControl fullWidth sx={{ m: 3 }}>
      <InputLabel >Assigned Position</InputLabel>
      <Select
        input={<OutlinedInput label="Assigned Position" />}
        multiple
        value={roles}
        onChange={handleChange}
      >
        {Object.values(ROLES).map((role) => (
          <MenuItem
            key={role}
            value={role}
          >
            {role}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

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
          {validUsername || username.length === 0 ? "" : <Typography>Require user name length between 3 to 24 characters with no space(Letters and Numbers only)</Typography>}

          <TextField fullWidth autoComplete='off' type='email' label='Email' variant='outlined' required sx={{ m: 3 }}
            value={email} onChange={e => setEmail(e.target.value)}
          />
          {validEmail || email.length === 0 ? "" : <Typography>Invalidate Email </Typography>}

          {options}
          {roles.length === 0 ? <Typography>Please select at least one position</Typography> : ""}


          <Paper sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, m: 2 }}>
            <Typography >User Status:   </Typography>
            <Typography>{active ? 'Activate' : 'Deactivate'}</Typography>
            <Switch
              sx={{ ml: 6 }}
              checked={active}
              onChange={handleActive}
            />
          </Paper>

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


export default EditUserForm