import React from 'react'
import { Typography, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material'
import LoadingMessage from '../../components/LoadingMessage'
import useAuth from '../../hooks/useAuth'
import { useGetBooksQuery } from './booksApiSlice'
import Book from './Book'
import Grid from '@mui/material/Unstable_Grid2'
import json2mq from 'json2mq'
import useMediaQuery from '@mui/material/useMediaQuery'


const BooksList = () => {

  const matches = useMediaQuery(
    json2mq({
      maxWidth: 600,
    }),
  )

  let Qty = matches ? 'Qty' : 'Quantities'

  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBooksQuery('booksList', {
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
    const { ids } = books

    const tableContent = ids?.length && ids.map(bookId => <Book key={bookId} bookId={bookId} />)

    content = (

      <Paper sx={{ height: '100%', mb: 10 }} >

        <Grid container sx={{ display: 'flex', alignItems: 'center', p: 3, borderBottom: 'solid 1px black' }} >
          <Grid xs={4} sm={2} md={2} >
            <Typography>Category</Typography>
          </Grid>
          <Grid xs={0} sm={3} md={2} >
            <Box sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }} >Product Image</Typography>
            </Box>
          </Grid>
          <Grid xs={3.8} sm={3} md={3} >
            <Typography>Name</Typography>
          </Grid>
          <Grid xs={0} sm={0} md={3} >
            <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>Author</Typography>
          </Grid>
          <Grid xs={2} sm={2} md={1} >
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} >{Qty}</Typography>
          </Grid>
          <Grid xs={2} sm={2} md={1} >
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} >Edit</Typography>
          </Grid>
        </Grid>

        {tableContent}

      </Paper>

    )
  }





  return content
}

export default BooksList