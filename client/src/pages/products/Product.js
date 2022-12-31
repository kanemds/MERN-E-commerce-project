import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetBooksQuery } from '../books/booksApiSlice'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Box, Paper, Typography, TextField, IconButton, Select, InputLabel, MenuItem, FormControl, Modal } from '@mui/material'
import LoadingMessage from '../../components/LoadingMessage'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { useAddNewProductMutation, useGetProductsQuery } from './productApiSlice'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 200,
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column'

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

  const navigate = useNavigate()
  const { id } = useParams()


  const [addNewProduct, {
    data: productId,
    isLoading: productIsLoading,
    isSuccess: productIsSuccess,
    isError: productIsError,
    error: productError
  }] = useAddNewProductMutation()



  const { book } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[id]
    })
  })


  const [bookShopCartId, setBookShopCartId] = useState(localStorage.getItem('BookShopCartId') || null)

  const [quantity, setQuantity] = useState(0)

  const [username, setUsername] = useState(null)
  const [open, setOpen] = useState(false)


  useEffect(() => {
    if (productIsSuccess) {
      if (localStorage.getItem('BookShopCartId') === null) {
        localStorage.setItem('BookShopCartId', productId)
        setBookShopCartId(productId)
      }
    }
  }, [productIsSuccess])

  const { product } = useGetProductsQuery('productsList', {
    selectFromResult: ({ data }) => ({
      product: data?.entities[bookShopCartId]
    })
  })



  const currentProduct = product?.details.find(product => product.bookId === book._id)


  const currentStocks = currentProduct?.quantity ? book?.instocks - currentProduct?.quantity : book?.instocks

  const banner = currentStocks >= 6 ? 'In Stocks' : 3 >= currentStocks && currentStocks > 1 ? 'Low Stocks' : currentStocks === 1 ? 'Only 1 Left' : 'Out of Stock'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpen(true)
    addNewProduct({ orderId: bookShopCartId, owner: username, details: { bookId: id, quantity } }).unwrap()
  }

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


  const canSave = quantity >= 1

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
                <Button disabled={!canSave} variant='contained' sx={{ width: '80%' }} onClick={handleSubmit}>Add to Cart</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >

                  <Box sx={style}>
                    {productIsLoading ?
                      <Box >
                        <LoadingMessage />
                      </Box> :
                      <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                          {quantity} ITEMS ADDED TO YOUR COURT
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }} >

                          <Typography id="modal-modal-description" >
                            SUBTOTAL | {product?.totalcounts}  item(s)
                          </Typography>

                          <Typography id="modal-modal-description" >
                            CAD $ {product?.totalprice.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                          <Button variant='contained' sx={{ width: 200 }} onClick={() => navigate('/carts')} >View Cart</Button>
                          <ColorButton variant='outlined' sx={{ width: 200 }} onClick={handleClose}>Continue Shopping</ColorButton>
                        </Box>
                      </Box>
                    }
                  </Box>
                </Modal>
              </Box>
            </Grid>

          </Grid >

        </Box >



      </Box >
    )
  }

  return content

}

export default Product