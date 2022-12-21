import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBooksQuery } from '../books/booksApiSlice'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Box, Paper, Typography, TextField, IconButton, Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { styled } from '@mui/system'
import LoadingMessage from '../../components/LoadingMessage'

const DisabledTextField = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000"
  },
  "& label.Mui-disabled": {
    color: 'rgba(0, 0, 0, 0.6)'
  }
}))


const Product = () => {

  const { id } = useParams()

  const { book } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[id]
    })
  })

  console.log(book)

  const { books } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      books: data?.ids.map(id => data?.entities[id])
    })
  })

  const [quantities, setQuantities] = useState(0)



  const handleChange = (event) => {
    setQuantities(event.target.value)
  }

  const selectedQuantity = (
    <Box >
      <FormControl sx={{ width: 100 }} >
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={quantities}
          label="Quantity"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )

  let content

  if (!book) return <LoadingMessage />

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

  return content

}

export default Product