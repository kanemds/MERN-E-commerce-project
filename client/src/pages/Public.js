import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'

import { useGetBooksQuery } from './books/booksApiSlice'
import LoadingMessage from '../components/LoadingMessage'

const Public = () => {



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

  if (isSuccess) {
    const { ids, entities } = books


    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
        <Typography variant='h6'>Welcome to K Book Store</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {ids.map((id, index) => {

              let view = document.getElementById(`view-${index + 1}`)

              return (
                <Button key={index + 1}
                  onClick={() => {
                    view.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: "start"
                    })
                  }}
                >
                  {index + 1}
                </Button>
              )
            })}
          </Box>
          <Box>
            {ids.map((book, index) =>
              <Paper key={index + 1} id={`view-${index + 1}`}>


                {book}

              </Paper>
            )}
          </Box>
        </Box>
      </Box >
    )
  }

  return content
}

export default Public