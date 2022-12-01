import React, { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from '../users/usersApiSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { Paper, Box, Button, TextField, Typography, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Switch } from '@mui/material'
import { current } from '@reduxjs/toolkit'

// included
const USER_REGEX = /^[a-zA-Z0-9-_.]{3,24}$/
// required type
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/


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
    setPassword(PWD_REGEX.test(password))
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
      await updateUser({ id: currentUser.id, username, password, roles, active })
    } else {
      await updateUser({ id: currentUser.id, username, roles, active })
    }
  }

  const handleShow = () => {
    setShow(prev => !prev)
  }

  const handleDelete = async () => {
    await deleteUser({ id: current.id })
  }

  let canSave
  if (password) {
    canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  }

  const options = (
    <FormControl sx={{ width: '600px', p: 3 }}>
      <InputLabel sx={{ m: 3 }}>Assigned Position</InputLabel>
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
    <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {error || deletedError ?
        <Paper sx={{ width: '600px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message || deletedError?.data.message}</Typography>
        </Paper>
        :
        <Paper sx={{ width: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ p: 3 }} >Edit User</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='User Name' variant='outlined' required sx={{ m: 3 }}
            value={username} onChange={e => setUsername(e.target.value)}
          />
          {validUsername || username.length === 0 ? "" : <Typography>User Name must be 3 to 24 characters(Letters and Numbers only) </Typography>}

          {options}
          {roles.length === 0 ? <Typography>Please select at least one position</Typography> : ""}


          <Paper sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, m: 3 }}>
            <Typography >User Status:   {active ? 'Activate' : 'Deactivate'}</Typography>
            <Switch
              sx={{ ml: 6 }}
              checked={active}
              onChange={handleActive}
            />
          </Paper>

          <Button onClick={handleShow} sx={{ m: 1 }}>Password Update</Button>
          {show ? '' :
            <>
              <TextField fullWidth autoComplete='off' type='password' label='Password' variant='outlined' required sx={{ m: 3 }}
                onChange={e => setPassword(e.target.value)}
              />
              <Typography variant='h8' >Password required at least: one number and one "!@#$%" special charater </Typography>
              {validPassword || password.length === 0 ? "" : <Typography>Invalided Password</Typography>}
              <TextField fullWidth autoComplete='off' type='password' label='Password Comfirm' variant='outlined' required sx={{ m: 3 }}
                onChange={e => setComfirm(e.target.value)}
              />
              {isMatch || comfirm.length === 0 ? "" : <Typography>Please match with password</Typography>}
            </>
          }

          <Box sx={{ m: 3 }}>
            <Button disabled={!canSave} onClick={handleUpdate} >Update</Button>
            <Button onClick={handleDelete}>Delete</Button>
            <Button><Link href='/' underline="none" >Cancel</Link></Button>
          </Box>
        </Paper>
      }
    </Box >
  )

  return content
}


export default EditUserForm