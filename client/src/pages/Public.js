import React, { useState } from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useGetBooksQuery } from './books/booksApiSlice'
import LoadingMessage from '../components/LoadingMessage'
import FrontPageDisplay from '../components/FrontPageDisplay'
import { CATEGORY } from '../config/category'
import { useScrollDirection } from '../components/useScrollDirection'
import { useEffect } from 'react'



const Public = () => {

  const scrollDirection = useScrollDirection()
  console.log(scrollDirection)

  const types = Object.values(CATEGORY)


  const [selected, setSelected] = useState(types[0])
  const [movement, setMovement] = useState(0)

  console.log(movement)






  const handleClick = (category, index) => {
    setSelected(category)
    document.getElementById(`${category}`).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: "start"
    })
  }



  const scrolling = (e) => {
    types.map(category => {
      if (scrollDirection === 'down') {
        setMovement(prev => prev + 1)
      }
      setMovement(prev => prev - 1)
    }
    )
  }



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
      <Box sx={{ display: 'flex', flexDirection: 'column' }} id='scroll' onWheel={scrolling} >

        <Box position="fixed" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
          {types?.map((category, index) =>

            <Button
              key={category}

              onClick={() => handleClick(category, index)}
              sx={{ m: 2 }}

              color={selected === category ? "primary" : "primary"}
              size={selected === category ? "large" : "small"}
              variant={selected === category ? "contained" : "text"}
            > {category}
            </Button>



          )}

        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          {types?.map((category, index) => {
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