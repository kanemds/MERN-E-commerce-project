import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import { Typography, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import User from './User'


const UserList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(undefined, //or null
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    })



  let content

  if (isLoading) {
    content = <Typography>Loading...</Typography>
  }

  if (isError) {
    content = <Typography>{
      error?.data?.message
    }</Typography>
  }

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length ?
      ids.map(userId => <User key={userId} userId={userId} />)
      : null


    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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