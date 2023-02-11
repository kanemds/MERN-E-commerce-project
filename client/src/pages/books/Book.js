import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TableBody, Typography, TableRow, Button, Paper, TableCell, Box, IconButton } from '@mui/material'
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
      <Box sx={{ p: 4 }}>
        <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
          <Grid xs={4} sm={2} md={2} >
            <Typography >
              {book.category}
            </Typography>
          </Grid>
          <Grid xs={0} sm={3} md={2} sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>

              <Paper sx={{ height: 140, width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container src={book.image} />
              </Paper>

            </Box>
          </Grid>
          <Grid xs={3.8} sm={3} md={3} >
            <Typography >{book.title}</Typography>
          </Grid>
          <Grid xs={0} sm={0} md={3} >
            <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>{book.author}</Typography>
          </Grid>
          <Grid xs={2} sm={2} md={1} >
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} >{book.instocks}</Typography>
          </Grid>
          <Grid xs={2} sm={2} md={1} sx={{ display: 'flex', justifyContent: 'center', m: 0, p: 0, }}>

            <Button sx={{ m: 0, p: 0 }} onClick={handleEdit} >
              <EditIcon />
            </Button>

          </Grid>
        </Grid>

      </Box>
    )
  } else {
    return null
  }
}

const memoizedBook = memo(Book)
export default memoizedBook