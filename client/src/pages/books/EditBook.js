import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import useAuth from '../../hooks/useAuth'
import LoadingMessage from '../../components/LoadingMessage'
import { useGetBooksQuery } from './booksApiSlice'
import EditBookForm from './EditBookForm'


export const EditBook = () => {

  const { id } = useParams()


  const { isManager, isAdmin } = useAuth()

  const { book } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[id]
    })
  })


  if (!book) return <LoadingMessage />
  if (!isManager || !isAdmin) return <Typography>Access Denied</Typography>

  const content = <EditBookForm book={book} />

  return content
}
