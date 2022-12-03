import React, { useEffect, useState } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { Switch, Paper, Box, Button, TextField, Typography, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { styled } from '@mui/system'

const DisabledTextField = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000"
  },
  "& label.Mui-disabled": {
    color: 'rgba(0, 0, 0, 0.6)'
  }
}))


const EditNoteForm = ({ note, users }) => {


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
  const [completed, setCompleted] = useState(note.completed)



  useEffect(() => {
    if (isSuccess || isDeletedSuccess) {
      setTitle('')
      setText('')
      navigate('/dash/notes')
    }
  }, [isSuccess, isDeletedSuccess, navigate])



  const canSave = [title.length, text.length, selectedUser].every(Boolean) && !isLoading

  const handleChange = e => {
    setSelectedUser(e.target.value)
  }

  const handleCompleted = (event) => {
    setCompleted(event.target.checked)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateNote({ id: note.id, user: selectedUser, title, text, completed })
    }
  }

  const handleDelete = async () => {
    await deleteNote({ id: note.id })
  }

  const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
  const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })

  const options = (

    <FormControl sx={{ width: '600px', p: 3 }}>
      <InputLabel sx={{ m: 3 }}>Assign To:</InputLabel>
      <Select

        input={<OutlinedInput label="Assign To:" />}
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

          <DisabledTextField fullWidth autoComplete='off' type='text' label='Created At:' variant='outlined' sx={{ m: 3 }}
            value={created} disabled
          />
          <DisabledTextField fullWidth autoComplete='off' type='text' label='Last Update:' variant='outlined' sx={{ m: 3 }}
            value={updated === created ? 'None' : updated} disabled
          />

          <TextField fullWidth autoComplete='off' type='text' label='Title' variant='outlined' required sx={{ m: 3 }}
            value={title} onChange={e => setTitle(e.target.value)}
          />

          <TextField fullWidth rows={4} multiline autoComplete='off' type='text' label='text' variant='outlined' required sx={{ m: 3 }}
            value={text} onChange={e => setText(e.target.value)}
          />

          {options}

          <Paper sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, m: 2 }}>
            <Typography >Note Status:   </Typography>
            <Typography>{completed ? 'Completed' : 'Open'}</Typography>
            <Switch
              sx={{ ml: 6 }}
              checked={completed}
              onChange={handleCompleted}
            />
          </Paper>


          <Box sx={{ m: 3 }}>
            <Button disabled={!canSave} onClick={handleUpdate} >Save</Button>
            <Button onClick={handleDelete} >Delete</Button>
            <Button><Link href='/dash/notes' underline="none" >Cancel</Link></Button>
          </Box>
        </Paper>
      }
    </Box >
  )

  return content
}

export default EditNoteForm