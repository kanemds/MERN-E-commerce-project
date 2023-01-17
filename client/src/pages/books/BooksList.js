import React from 'react'
import { Typography, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material'
import LoadingMessage from '../../components/LoadingMessage'
import useAuth from '../../hooks/useAuth'
import { useGetBooksQuery } from './booksApiSlice'
import Book from './Book'




const BooksList = () => {


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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="left">Product Image</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="left">Quantities</TableCell>
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

export default BooksList