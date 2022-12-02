import React, { useEffect, useState } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { Paper, Box, Button, TextField, Typography, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select } from '@mui/material'

const EditNoteForm = ({ note, users }) => {

  console.log(note)

  const [updateNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateNoteMutation()


  const [deleteNote, {
    isSuccess: isDeletedSuccess,
    isError: isDeleteError,
    error: deleteError
  }] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [selectedUser, setSelectedUser] = useState(note.user)



  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  const canSave = [title.length, text.length].every(Boolean) && !isLoading

  const handleChange = e => {
    setSelectedUser(e.target.value)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateNote({ user: selectedUser.id, title, text })
    }
  }

  const handleDelete = async () => {
    await deleteNote({ id: note.id })
  }

  const options = (

    <FormControl sx={{ width: '600px', p: 3 }}>
      <InputLabel sx={{ m: 3 }}>Note Created By</InputLabel>
      <Select

        input={<OutlinedInput label="Note Created By" />}
        // multiple

        value={selectedUser} // multiple must set as []
        onChange={handleChange}
      >
        {users.map((user) => (
          <MenuItem
            key={user.id}
            value={user.username}
          >
            {user.username}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )


  const content = (
    <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {error ?
        <Paper sx={{ width: '600px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
        </Paper>
        :
        <Paper sx={{ width: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ p: 3 }} >Edit Note</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='Title' variant='outlined' required sx={{ m: 3 }}
            value={title} onChange={e => setTitle(e.target.value)}
          />

          <TextField fullWidth autoComplete='off' type='text' label='text' variant='outlined' required sx={{ m: 3 }}
            value={text} onChange={e => setText(e.target.value)}
          />

          {options}

          <Box sx={{ m: 3 }}>
            <Button disabled={!canSave} onClick={handleUpdate} >Submit</Button>
            <Button onClick={handleDelete} >Submit</Button>
            <Button><Link href='/' underline="none" >Cancel</Link></Button>
          </Box>

        </Paper>
      }

    </Box >
  )

  return content
}

export default EditNoteForm