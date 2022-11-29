import React, { useState, useEffect } from 'react'
import { useAddNewUserMutation } from '../users/usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'

const NewNote = () => {

  // included
  const USER_REGEX = /^[a-zA-Z0-9-_.]{3,24}$/
  // required type
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

  const NewUserForm = () => {
    const [addNewUser,] = useAddNewUserMutation()
  }

  return (
    <div>NewNote</div>
  )
}

export default NewNote