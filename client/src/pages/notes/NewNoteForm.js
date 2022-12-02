import React, { useState } from 'react'
import { useAddNewNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { Paper, Box, Button, TextField, Typography, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select } from '@mui/material'


const NewNoteForm = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const [addNewNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewNoteMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({ title, text })
    }
  }



  const canSave = [title.length, text.length].every(Boolean) && !isLoading

  const content = (
    <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {error ?
        <Paper sx={{ width: '600px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
        </Paper>
        :
        <Paper sx={{ width: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ p: 3 }} >Create New Note</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='Title' variant='outlined' required sx={{ m: 3 }}
            onChange={e => setTitle(e.target.value)}
          />

          <TextField fullWidth autoComplete='off' type='text' label='text' variant='outlined' required sx={{ m: 3 }}
            onChange={e => setText(e.target.value)}
          />

          <Box sx={{ m: 3 }}>
            <Button disabled={!canSave} onClick={handleSubmit} >Submit</Button>
            <Button><Link href='/' underline="none" >Cancel</Link></Button>
          </Box>

        </Paper>
      }

    </Box >
  )


  return content
}

export default NewNoteForm