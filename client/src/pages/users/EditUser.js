import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersApiSlice'
import { Typography } from '@mui/material'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
// https://www.npmjs.com/package/react-spinners
import ScaleLoader from 'react-spinners/ScaleLoader'

const EditUser = () => {
  const { id } = useParams()

  // const currentUser = useSelector(state => selectUserById(state, id))

  const { currentUser } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      currentUser: data?.entities[id]
    })
  })

  if (!currentUser) return <ScaleLoader color='grey' />

  const content = <EditUserForm currentUser={currentUser} />

  return content
}

export default EditUser