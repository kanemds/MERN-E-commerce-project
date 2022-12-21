import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetBooksQuery } from '../books/booksApiSlice'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Box, Paper, Typography } from '@mui/material'
import Image from '../../components/Image'

const Product = () => {

  const { id } = useParams()

  const { book } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[id]
    })
  })

  const { books } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      books: data?.ids.map(id => data?.entities[id])
    })
  })




  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid container >
        <Grid xs={5}>
          <Box
            component="img"
            sx={{
              height: 550,
              display: 'block',
              width: 400,
              overflow: 'hidden',

            }}
            src={book.image}
            alt={book.title}
          />
        </Grid>
        <Grid xs={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5'>{book.title}</Typography>
          <br />
          <Typography variant='h6'>By: {book.author}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Product