import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useGetBooksQuery } from './books/booksApiSlice'
import LoadingMessage from '../components/LoadingMessage'
import FrontPageDisplay from '../components/FrontPageDisplay'
import { CATEGORY } from '../config/category'


const Public = () => {






  const handleClick = (category) => {
    document.getElementById(`${category}`).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: "start"
    })
  }

  const types = Object.values(CATEGORY)

  const { books } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      books: data?.ids.map(id => data?.entities[id])
    })
  })


  let content

  if (!books) {
    content = <LoadingMessage />
  }

  if (books) {

    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column' }} >

        <Box position="fixed" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
          {types?.map((category) =>
            <Button
              key={category}
              onClick={() => handleClick(category)}
            >
              {category}
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          {types?.map((category) => {
            let currentCategory = books.filter(book => book.category === category)



            return (
              <Paper key={category} id={`${category}`} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70%', width: '50%', m: 20 }}>
                <FrontPageDisplay currentCategory={currentCategory} />
              </Paper>
            )
          }
          )}
        </Box>

      </Box >
    )
  }

  return content
}

export default Public