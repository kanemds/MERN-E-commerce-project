import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersApiSlice'
import { Typography } from '@mui/material'
import EditUserForm from './EditUserForm'


const EditUser = () => {
  const { id } = useParams()

  const currentUser = useSelector(state => selectUserById(state, id))

  const content = currentUser ? <EditUserForm currentUser={currentUser} /> : <Typography>Loading...</Typography>

  return content
}

export default EditUser