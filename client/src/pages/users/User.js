import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { TableBody, TableCell, TableRow, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const User = ({ userId }) => {

  const user = useSelector(state => selectUserById(state, userId))
  console.log(user)

  const navigate = useNavigate()

  if (user) {

  } else {
    return null
  }

  return (
    <TableBody>

      <TableRow

        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {user.username}
        </TableCell>
        <TableCell align="left">{user.roles}</TableCell>
        <TableCell align="center"><Button><EditIcon /></Button></TableCell>

      </TableRow>

    </TableBody>
  )
}

export default User 