import { Typography, Table, TableCell, Box, TableContainer, TableHead, TableRow, Paper, Link, Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import LoadingMessage from '../../components/LoadingMessage'
import { useGetCartsQuery } from './cartApiSlice'
import CartList from './CartList'
import { styled } from '@mui/material/styles'
import { grey, red } from '@mui/material/colors'



const KEEPSHOPPING = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[50]),
  backgroundColor: grey[50],
  '&:hover': {
    backgroundColor: grey[200],
    border: '1px #9e9e9e solid'
  },
  border: '1px #bdbdbd solid',
}))

const CHECKOUT = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500
  ]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
    border: '1px #d32f2f solid'
  },
  border: '1px #f44336 solid',
}))


const ShoppingCart = () => {

  const [cartId, setCartId] = useState(localStorage.getItem('BookShopCartId') || null)

  console.log(cartId)

  const { cart } = useGetCartsQuery('cartsList', {
    selectFromResult: ({ data }) => ({
      cart: data?.entities[cartId]
    })
  })

  console.log(cart)

  let content

  if (cartId == null) {
    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6'>
          Your cart is currently empty.
        </Typography>
        <Link to='/' component={RouterLink} underline='none' color='#1976d2'>Keep Shopping to K Book Shop</Link>
      </Box >
    )
  }

  if (cartId) {
    if (!cart) {
      content = (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LoadingMessage />
        </Box >
      )
    } else {
      content = (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box >
            <Typography variant='h5'>SHOPPING CART</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
            <Box sx={{ width: '65%' }}>
              <CartList />
            </Box>

            <Box sx={{ width: '30%' }}>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', border: '1px solid lightGrey' }}>
                <Typography sx={{ mt: 4, ml: 2, mr: 2 }}>ORDER SUMMARY | {cart.totalproducts} ITEM(S)</Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 4, ml: 2, mr: 2
                }} >
                  <Typography>SUBTOTAL</Typography>
                  <Typography>CAD $ {cart.totalprice.toFixed(2)}</Typography>
                </Box>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 4, ml: 2, mr: 2
                }}>
                  <Typography variant='body2'>Estimated Tax</Typography>
                  <Typography variant='body2'>TBD</Typography>
                </Box>

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 4, ml: 2, mr: 2
                }}>
                  <Typography>ORDER TOTAL</Typography>
                  <Typography>CAD $ {cart.totalprice.toFixed(2)}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
                <CHECKOUT variant='contained'>CHECKOUT</CHECKOUT>
                <KEEPSHOPPING variant='contained' sx={{ mt: 2 }}>COUTINUE SHOPPING</KEEPSHOPPING>
              </Box>
            </Box>
          </Box>
        </Box >
      )
    }
  }



  return content
}

export default ShoppingCart

