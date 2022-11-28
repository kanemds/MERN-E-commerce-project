import React from 'react'
import { useGetNotesQuery } from './notesApiSlice'
import { Typography, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import Note from './Note'

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery()



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
    const { ids } = notes
    console.log(notes)
    console.log(ids)

    const tableContent = ids?.length ?
      ids.map(noteId => <Note key={noteId} noteId={noteId} />)
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

export default NotesList