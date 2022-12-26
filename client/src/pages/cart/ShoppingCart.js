import { Box, Typography, Link } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { useGetCartsQuery } from './cartApiSlice'


const ShoppingCart = () => {

  const [cartId, setCartId] = useState(localStorage.getItem('BookShopCartId') || null)

  console.log(cartId)


  let content

  if (cartId == null) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h6'>
          Your cart is currently empty.
        </Typography>
        <Link to='/' component={RouterLink} underline='none' color='#1976d2'>Keep Shopping to K Book Shop</Link>
      </Box >
    )
  }

  return { content }
}

export default ShoppingCart

