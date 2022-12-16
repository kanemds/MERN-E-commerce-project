import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useGetBooksQuery } from './books/booksApiSlice'
import LoadingMessage from '../components/LoadingMessage'
import FrontPageDisplay from '../components/FrontPageDisplay'
import { SECTIONS } from '../config/sections'

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

  const types = Object.values(SECTIONS)


  let content

  if (isLoading) {
    content = <LoadingMessage />
  }

  if (isSuccess) {
    const { ids, entities } = books

    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column' }} >
        <Typography variant='h6'>Welcome to K Book Store</Typography>

        <Box position="fixed" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
          {types?.map((category) => {
            let view = document.getElementById(`view-${category}`)

            return (
              <Button key={category}
                onClick={() => {
                  view.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: "start"
                  })
                }}
              >
                {category}
              </Button>
            )
          })}
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Box>
            {types?.map((category) => {

              let currentCategory = ids.filter(id => entities[id].category === category)

              return (
                <Paper key={category} id={`view-${category}`} sx={{ height: '60vh' }}>
                  <FrontPageDisplay props={currentCategory} />

                </Paper>
              )
            }
            )}
          </Box>
        </Box>
      </Box>
    )
  }

  return content
}

export default Public