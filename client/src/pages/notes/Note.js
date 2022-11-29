import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { TableBody, TableCell, TableRow, Button, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const Note = ({ noteId }) => {

  const note = useSelector(state => selectNoteById(state, noteId))

  const navigate = useNavigate()

  if (note) {
    const createdAt = new Date(note.createdAt).toLocaleString('en-US', {
      day: 'numeric', month: 'long'
    })
    const updatedAt = new Date(note.updatedAt).toLocaleString('en-US', {
      day: 'numeric', month: 'long'
    })

    const handleEdit = () => navigate(`/dash/notes/${noteId}`)

    return (
      <TableBody>

        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {note.completed ?
              <Typography>Completed</Typography>
              :
              <Typography>Open</Typography>
            }
          </TableCell>
          <TableCell align="left">{createdAt}</TableCell>
          <TableCell align="left">{updatedAt}</TableCell>
          <TableCell align="left">{note.title}</TableCell>
          <TableCell align="left">{note.user}</TableCell>
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

export default Note