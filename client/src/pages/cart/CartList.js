import { Button, Box, Paper, Typography, TextField, IconButton, Select, InputLabel, MenuItem, FormControl, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import ClearIcon from '@mui/icons-material/Clear'
import { styled } from '@mui/material/styles'
import { useGetBooksQuery } from '../books/booksApiSlice'
import { useUpdateProductMutation, useDeleteProductMutation } from '../products/productApiSlice'
import LoadingMessage from '../../components/LoadingMessage'
import { useNavigate } from 'react-router-dom'

const DELETEBUTTON = styled(IconButton)(({ theme }) => ({
  padding: '4px'
}))


const CartList = ({ product }) => {

  const navigate = useNavigate()

  const [updateProduct, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateProductMutation()

  const [deleteProduct, {
    isSuccess: isDeleteSucess
  }] = useDeleteProductMutation()

  const { book } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[product.bookId]
    })
  })


  const [cartId, setCartId] = useState(localStorage.getItem('BookShopCartId') || null)
  const [quantity, setQuantity] = useState(product?.quantity)

  useEffect(() => {
    updateProduct({ orderId: cartId, details: { bookId: product.bookId, quantity } })
  }, [quantity])

  const currentStocks = book?.instocks


  let amount
  // !! if we return here below code won't run and will display the amount 
  // if (currentStocks >= product.quantity && product.quantity > 6) amount = product.quantity
  // if (currentStocks >= 6 && product.quantity <= 6) amount = 6
  // if (currentStocks < 6) amount = currentStocks

  if (product.quantity > 6) amount = product.quantity
  if (product.quantity <= 6) amount = 6
  if (product.quantity < 6) amount = product.quantity


  const handleChange = (event) => {
    setQuantity(event.target.value)
  }

  const menu = (amount) => {
    let menuItems = []
    for (let i = 1;i <= amount;i++) {
      menuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return menuItems
  }

  const selectedQuantity = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ mr: 2 }}>QUANTITY</Typography>
      <FormControl >
        <Select
          sx={{ height: 30, width: 65 }}
          value={quantity}
          onChange={handleChange}
        >
          {menu(amount)}
        </Select>
      </FormControl>
    </Box >
  )

  let content

  if (!book && !product) content = <LoadingMessage />

  if (book && product) {
    content = (
      <>
        {
          <Grid key={product.bookId} container sx={{ width: '100%', flexGrow: 1, borderBottom: '1px solid lightGrey', mt: 3 }} spacing={2}>
            <Grid xs={3}>
              <Button onClick={() => navigate(`/products/${product.bookId}`)}>
                <Box
                  component="img"
                  sx={{ width: '100%', height: '180px' }}
                  src={product.image}
                  alt={product.title}
                />
              </Button>
            </Grid>
            <Grid xs={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} >

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Typography variant='h6'>{product.title}</Typography>
                  <DELETEBUTTON onClick={() => deleteProduct({ cartId, productId: product.bookId })}><ClearIcon /></DELETEBUTTON>
                </Box>
                <Typography variant='h7'>Author: {product.author}</Typography>
              </Box>

              <Typography variant='h7' >CAD $ {product.price.toFixed(2)}</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h7' >{selectedQuantity}</Typography>
                <Typography variant='h7' >SUBTOTAL: CAD $  {product.total.toFixed(2)}</Typography>
              </Box>

            </Grid>
          </Grid>
        }
      </>
    )
  }

  return content
}

export default CartList