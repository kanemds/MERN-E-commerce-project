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

      <TableContainer component={Paper} sx={{ height: '100%' }} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ borderBottom: '1px solid grey', '&:last-child td, &:last-child th': { border: 0 } }}>
              <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
                <Grid xs={4} sm={2} md={2} >
                  <TableCell>Category</TableCell>
                </Grid>
                <Grid xs={0} sm={3} md={2} >
                  <Box sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>
                    <TableCell sx={{ display: 'flex', justifyContent: 'center' }} >Product Image</TableCell>
                  </Box>
                </Grid>
                <Grid xs={3.8} sm={3} md={3} >
                  <TableCell>Name</TableCell>
                </Grid>
                <Grid xs={0} sm={0} md={3} >
                  <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>Author</TableCell>
                </Grid>
                <Grid xs={2} sm={2} md={1} >
                  <TableCell sx={{ display: 'flex', justifyContent: 'center' }} >{Qty}</TableCell>
                </Grid>
                <Grid xs={2} sm={2} md={1} >
                  <TableCell sx={{ display: 'flex', justifyContent: 'center' }} >Edit</TableCell>
                </Grid>
              </Grid>
            </TableRow>
          </TableHead>
          {tableContent}
        </Table>
      </TableContainer>

    )
  }





  return content
}

export default BooksList