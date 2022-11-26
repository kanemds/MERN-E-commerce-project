import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import { Typography } from '@mui/material'

const UserList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()
  console.log(error)

  let content

  if (isLoading) {
    content = <Typography>Loading...</Typography>
  }

  if (isError) {
    content = <Typography>{
      error?.data?.message
    }</Typography>
  }

  return (
    <div>UserList</div>
  )
}

export default UserList