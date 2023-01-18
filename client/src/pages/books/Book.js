import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TableBody, TableCell, TableRow, Button, Paper, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useGetBooksQuery } from './booksApiSlice'
import { memo } from 'react'
import styled from 'styled-components'
import Grid from '@mui/material/Unstable_Grid2'

const Container = styled.img`
    width:100%;
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

        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, flexGrow: 1 }}>
          <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
            <Grid xs={4} sm={2} md={2} >
              <TableCell >
                {book.category}
              </TableCell>
            </Grid>
            <Grid xs={0} sm={3} md={2} >
              <Box sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Paper sx={{ height: 140, width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Container src={book.image} />
                  </Paper>
                </TableCell>
              </Box>
            </Grid>
            <Grid xs={3.8} sm={3} md={3} >
              <TableCell >{book.title}</TableCell>
            </Grid>
            <Grid xs={0} sm={0} md={3} >
              <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>{book.author}</TableCell>
            </Grid>
            <Grid xs={2} sm={2} md={1} >
              <TableCell sx={{ display: 'flex', justifyContent: 'center' }} >{book.instocks}</TableCell>
            </Grid>
            <Grid xs={2} sm={2} md={1} >
              <TableCell sx={{ display: 'flex', justifyContent: 'center', m: 0, p: 0, }}>
                <Button sx={{ m: 0, p: 0, }} onClick={handleEdit}>
                  <EditIcon />
                </Button>
              </TableCell>
            </Grid>
          </Grid>
        </TableRow>
      </TableBody>
    )
  } else {
    return null
  }
}

const memoizedBook = memo(Book)
export default memoizedBook