import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TableBody, TableCell, TableRow, Button, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useGetBooksQuery } from './booksApiSlice'
import { memo } from 'react'
import styled from 'styled-components'

const Container = styled.img`
    width:auto;
    height: 100%;
    padding: 0;
    margin: 0;
`

const Book = ({ bookId }) => {

  const navigate = useNavigate()

  const { book } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[bookId]
    })
  })


  if (book) {
    const handleEdit = () => navigate(`/dash/books/${bookId}`)

    return (
      <TableBody>

        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {book.category}
          </TableCell>
          <TableCell align="left">
            <Paper sx={{ height: 140, width: 110, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Container src={book.image} />
            </Paper>
          </TableCell>
          <TableCell align="left">{book.title}</TableCell>
          <TableCell align="left">{book.author}</TableCell>
          <TableCell align="left">{book.instocks}</TableCell>
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

const memoizedBook = memo(Book)
export default memoizedBook