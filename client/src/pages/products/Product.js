import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBooksQuery } from '../books/booksApiSlice'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Box, Paper, Typography, TextField, IconButton, Select, InputLabel, MenuItem, FormControl, Modal } from '@mui/material'
import LoadingMessage from '../../components/LoadingMessage'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[300]),
  backgroundColor: grey[300],
  '&:hover': {
    backgroundColor: grey[400],
    border: '1px #9e9e9e solid'
  },
  border: '1px #bdbdbd solid',
}))

const Product = () => {


  const { id } = useParams()

  const { book } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[id]
    })
  })

  console.log(book)

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
      menuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return menuItems
  }

  const handleChange = (event) => {
    setQuantity(event.target.value)
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const selectedQuantity = (
    <Box>
      <Typography>Quantity</Typography>
      <FormControl >
        <Select
          sx={{ height: 30, width: 65 }}
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



  if (book) {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', height: 500 }}>
        <Box sx={{ flexGrow: 1, p: 1, maxWidth: 800 }}>
          <Grid container spacing={4}>
            <Grid xs={5}>
              <Box
                component="img"
                sx={{ height: 400, width: '100%' }}
                src={book.image}
                alt={book.title}
              />
              <Typography variant='h7'>Author: {book.author}</Typography>
            </Grid>
            <Grid xs={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h5'>{book.title}</Typography>
                <br />
                <Typography variant='h7'>{book.description}</Typography>
                <br />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Typography variant='h6'>Price: ${book.price.toFixed(2)}</Typography>

                {selectedQuantity}
              </Box >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ width: '80%' }} onClick={handleOpen}>Add to Cart</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                      x ITEMS ADDED TO YOUR COURT
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }} >
                      <Box sx={{ display: 'flex' }}>
                        <Typography id="modal-modal-description" >
                          SUBTOTAL |
                        </Typography>
                        <Typography id="modal-modal-description" >
                          x item(s)
                        </Typography>
                      </Box>
                      <Typography id="modal-modal-description" >
                        CAD $ xxx.00
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant='contained' sx={{ width: 200 }} >View Cart</Button>
                      <ColorButton variant='outlined' sx={{ width: 200 }} >Continue Shopping</ColorButton>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </Grid>

          </Grid>

        </Box>



      </Box >
    )
  }

  return content

}

export default Product