import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import { Typography, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import User from './User'
import LoadingMessage from '../../components/LoadingMessage'


const UserList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('usersList', //or null
    {
      pollingInterval: 15 * 60 * 1000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    })



  let content

  if (isLoading) {
    content = <LoadingMessage />
  }

  if (isError) {
    content = <Typography>{
      error?.data?.message
    }</Typography>
  }

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

    content = (
      <TableContainer component={Paper} sx={{ height: '100%' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ borderBottom: '1px solid grey', '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>User Name</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          {tableContent}
        </Table>
      </TableContainer>
    )
  }


  return content


}

export default UserList