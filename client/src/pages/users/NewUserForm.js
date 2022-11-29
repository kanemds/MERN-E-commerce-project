import React, { useState, useEffect } from 'react'
import { useAddNewUserMutation } from '../users/usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { set } from 'immer/dist/internal'

const NewUserForm = () => {

  // included
  const USER_REGEX = /^[a-zA-Z0-9-_.]{3,24}$/
  // required type
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

  const NewUserForm = () => {
    const [addNewUser, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useAddNewUserMutation()
  }

  const navigate = useNavigate()

  const [username, setUserName] = useState('')
  const [validUserName, setValidUserName] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(['Employee'])

  useEffect(() => {
    setValidUserName(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setUserName('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, navigate])

  return (
    <div>NewUserForm</div>
  )
}

export default NewUserForm