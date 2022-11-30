import React, { useState, useEffect } from 'react'
import { useAddNewUserMutation } from '../users/usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { Paper, Box, Button, TextField, Typography, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
// included
const USER_REGEX = /^[a-zA-Z0-9-_.]{3,24}$/
// required type
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/

const NewUserForm = () => {


  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setRoles(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }



  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()


  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [comfirm, setComfirm] = useState("")
  const [isMatch, setIsMatch] = useState(false)
  const [roles, setRoles] = useState(["Employee"])



  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    const match = comfirm === password
    setIsMatch(match)
  }, [comfirm, password])

  useEffect(() => {
    setRoles(roles)
  }, [roles])

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, navigate])


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


  const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, password, roles })
    }
  }

  const content = (
    <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {error ?
        <Paper sx={{ width: '600px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
        </Paper>
        :
        <Paper sx={{ width: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ p: 3 }} >Create New User</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='User Name' variant='outlined' required sx={{ m: 3 }}
            onChange={e => setUsername(e.target.value)}
          />
          {validUsername || username.length === 0 ? "" : <Typography>User Name must be 3 to 24 characters(Letters and Numbers only) </Typography>}
          <TextField fullWidth autoComplete='off' type='password' label='Password' variant='outlined' required sx={{ m: 3 }}
            onChange={e => setPassword(e.target.value)}
          />
          <Typography variant='h8' >Password required at least: one number and one "!@#$%" special charater </Typography>
          {validPassword || password.length === 0 ? "" : <Typography>Invalided Password</Typography>}
          <TextField fullWidth autoComplete='off' type='password' label='Password Comfirm' variant='outlined' required sx={{ m: 3 }}
            onChange={e => setComfirm(e.target.value)}
          />
          {isMatch || comfirm.length === 0 ? "" : <Typography>Please match with password</Typography>}

          {options}
          {roles.length === 0 ? <Typography>Please select at least one position</Typography> : ""}
          <Box sx={{ m: 3 }}>
            <Button disabled={!canSave} onClick={handleSubmit} >Submit</Button>
            <Button><Link href='/' underline="none" >Cancel</Link></Button>
          </Box>
        </Paper>
      }
    </Box >
  )

  return content
}

export default NewUserForm