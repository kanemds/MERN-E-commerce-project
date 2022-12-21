import React from 'react'
import { useGetNotesQuery } from './notesApiSlice'
import { Typography, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import Note from './Note'
import useAuth from '../../hooks/useAuth'
import LoadingMessage from '../../components/LoadingMessage'

const NotesList = () => {

  const { username, isManager, isAdmin, status } = useAuth()


  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery('notesList', {
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


    const { ids, entities } = notes


    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(id => entities[id].user === username)
    }

    const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ticket Status</TableCell>
              <TableCell align="left">Created</TableCell>
              <TableCell align="left">Updated</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Creater</TableCell>
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