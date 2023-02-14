import { Button, Box, Paper, Typography, TextField, IconButton, Select, InputLabel, MenuItem, FormControl, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import ClearIcon from '@mui/icons-material/Clear'
import { styled } from '@mui/material/styles'
import { useGetBooksQuery } from '../books/booksApiSlice'
import { useUpdateProductMutation, useDeleteProductMutation } from '../products/productApiSlice'
import LoadingMessage from '../../components/LoadingMessage'
import { useNavigate } from 'react-router-dom'
import json2mq from 'json2mq'
import useMediaQuery from '@mui/material/useMediaQuery'


const DELETEBUTTON = styled(IconButton)(({ theme }) => ({
  padding: '4px'
}))


const CartList = ({ product }) => {

  const navigate = useNavigate()

  const {
    data,
    isLoading: isBookLoading,
    isSuccess: isBookSuccess
  } = useGetBooksQuery()

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

  const currentStocks = book?.instocks || 0

  const [cartId, setCartId] = useState(localStorage.getItem('BookShopCartId') || null)
  const [quantity, setQuantity] = useState(product?.quantity)
  const [previous, setPrevious] = useState(product?.previous)
  const [isSave, setIsSave] = useState(product?.issave)

  useEffect(() => {
    updateProduct({ orderId: cartId, details: { bookId: product.bookId, quantity, previous } })
  }, [quantity])



  let amount
  // !! if we return here below code won't run and will display the amount 

  if (isSave) {
    const reSelectedQuantity = currentStocks + product.quantity
    if (reSelectedQuantity >= product.quantity && product.quantity >= 6) amount = product.quantity
    if (reSelectedQuantity >= 6 && 6 >= product.quantity) amount = 6
    if (reSelectedQuantity <= 6 && reSelectedQuantity <= product.quantity) amount = reSelectedQuantity
    if (reSelectedQuantity <= 6 && reSelectedQuantity >= product.quantity) amount = reSelectedQuantity
  }


  if (!isSave) {
    if (currentStocks >= product.quantity && product.quantity >= 6) amount = product.quantity
    if (currentStocks >= 6 && 6 >= product.quantity) amount = 6
    if (currentStocks <= 6 && currentStocks <= product.quantity) amount = currentStocks
    if (currentStocks <= 6 && currentStocks >= product.quantity) amount = currentStocks
  }


  const banner = currentStocks >= 6 ? 'In Stocks' : 5 >= currentStocks && currentStocks > 1 ? 'Low Stocks' : currentStocks === 1 ? 'Only 1 Left' : ''


  const handleChange = (event) => {
    setQuantity(event.target.value)
  }

  const handleDelete = () => {
    deleteProduct({ cartId, productId: product.bookId })
  }



  const menu = (amount) => {
    let menuItems = []
    for (let i = 1;i <= amount;i++) {
      menuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return menuItems
  }

  const matches = useMediaQuery(
    json2mq({
      maxWidth: 599
    }),
  )


  let qty = matches ? 'Qty' : 'QUANTITY'


  const selectedQuantity = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ mr: 2 }}>{qty}</Typography>
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



  // if (!book || !product || isLoading || !quantity || isBookLoading) return content = <LoadingMessage />

  if (book && product) {
    content = (
      <>
        {
          <Grid key={product.bookId} container sx={{ flexGrow: 1, borderBottom: '1px solid lightGrey', mt: 3 }} spacing={2}>
            <Grid xs={4}>
              <Button sx={{ width: '100%' }} onClick={() => navigate(`/products/${product.bookId}`)}>
                <Paper
                  component="img"
                  sx={{ height: '140px', width: '100px' }}
                  src={product.image}
                  alt={product.title}
                />
              </Button>
            </Grid>
            <Grid xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} >

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Typography variant='h6'>{product.title}</Typography>
                  <DELETEBUTTON onClick={handleDelete}><ClearIcon /></DELETEBUTTON>
                </Box>
                <Typography variant='h7' sx={{ mt: 1 }}>Author: {product.author}</Typography>
              </Box>

              <Typography variant='h7' sx={{ mt: 1 }}>CAD $ {product.price.toFixed(2)}</Typography>

              <Box >
                {currentStocks <= 0 ?
                  <Typography>Item currently Out of Stock</Typography>
                  :
                  <Box >
                    <Box sx={{ mt: 1 }}> <Typography variant='h7' >{selectedQuantity}</Typography></Box>
                    <Box sx={{ mt: 1 }} > <Typography variant='h7' >SUBTOTAL: CAD $  {product.total.toFixed(2)}</Typography></Box>
                  </Box>
                }
              </Box>
              <Typography sx={{ mt: 1 }}>
                {banner}
              </Typography>
            </Grid>
          </Grid>
        }
      </>
    )
  }

  return content
}

export default CartList