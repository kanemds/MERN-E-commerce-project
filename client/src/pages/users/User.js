import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { TableBody, TableCell, TableRow, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const User = ({ userId }) => {

  const user = useSelector(state => selectUserById(state, userId))

  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)
    // replaceAll(a, to b)
    const userRolesString = user.roles.toString().replaceAll(',', ', ')


    return (
      <TableBody>

        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {user.username}
          </TableCell>
          <TableCell align="left">{userRolesString}</TableCell>
          <TableCell align="center">
            <Button onClick={handleEdit}>
              <EditIcon />
            </Button>
          </TableCell>
        </TableRow>

      </TableBody>
    )
  } else {
    return null
  }
}

export default User 