import React from 'react'
import { Typography, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import LoadingMessage from '../../components/LoadingMessage'
import useAuth from '../../hooks/useAuth'
import { useGetBooksQuery } from './booksApiSlice'


const BooksList = () => {

  const { username, isManager, isAdmin, status } = useAuth()

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

  console.log(books)

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
    const { ids, entities } = books
    console.log(ids)
    console.log(entities)
  }

  return (
    <div>BooksList</div>
  )
}

export default BooksList