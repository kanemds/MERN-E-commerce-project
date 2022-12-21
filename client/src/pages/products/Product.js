import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBooksQuery } from '../books/booksApiSlice'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Box, Paper, Typography, TextField, IconButton, Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import LoadingMessage from '../../components/LoadingMessage'



const Product = () => {

  const { id } = useParams()

  const { book } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[id]
    })
  })


  const [quantity, setQuantity] = useState(0)


  const currentStocks = book?.instocks


  const banner = currentStocks >= 6 ? 'In Stocks' : 3 >= currentStocks && currentStocks > 0 ? 'Low Stocks' : 'Out of Stock'


  let amount
  // !! if we return here below code won't run and will display the amount 
  if (currentStocks >= 6) amount = 6
  if (currentStocks < 6) amount = currentStocks



  const menu = (amount) => {
    let menuItems = []
    for (let i = 0;i <= amount;i++) {
      menuItems.push(<MenuItem value={i}>{i}</MenuItem>)
    }
    return menuItems
  }

  const handleChange = (event) => {
    setQuantity(event.target.value)
  }

  const selectedQuantity = (
    <Box >
      <Typography>Quantity</Typography>
      <FormControl sx={{ width: 100 }} >
        <Select
          value={quantity}
          onChange={handleChange}
        >
          {menu(amount)}

        </Select>
      </FormControl>
      <Typography>
        {banner}
      </Typography>
    </Box >
  )

  let content

  if (!book) return content = <LoadingMessage />
  console.log(book)



  if (book) {
    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

        <Box sx={{ flexGrow: 1, p: 1, maxWidth: 700 }}>
          <Grid container spacing={4}>
            <Grid xs={5}>
              <Box
                component="img"
                sx={{ height: 400, width: '100%' }}
                src={book.image}
                alt={book.title}
              />
            </Grid>
            <Grid xs={7} >
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h5'>{book.title}</Typography>
                <br />
                <Typography variant='h7'>{book.description}</Typography>
                <br />
                <Typography variant='h7'>By: {book.author}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {selectedQuantity}
        <Box>
          <Typography>You might also interested in</Typography>
        </Box>
      </Box >
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>

      <Box sx={{ flexGrow: 1, p: 1, maxWidth: 700 }}>
        <Grid container spacing={4}>
          <Grid xs={5}>
            <Box
              component="img"
              sx={{ height: 400, width: '100%' }}
              src={book.image}
              alt={book.title}
            />
          </Grid>
          <Grid xs={7} >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='h5'>{book.title}</Typography>
              <br />
              <Typography variant='h7'>{book.description}</Typography>
              <br />
              <Typography variant='h7'>By: {book.author}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {selectedQuantity}
      <Box>
        <Typography>You might also interested in</Typography>
      </Box>
    </Box >
  )
}

export default Product