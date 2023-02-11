import { Typography, Table, TableCell, Box, TableContainer, TableHead, TableRow, Paper, Link, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import LoadingMessage from '../../components/LoadingMessage'
import { useGetCartsQuery } from './cartApiSlice'
import CartList from './CartList'
import { styled } from '@mui/material/styles'
import { grey, red, pink } from '@mui/material/colors'
import { useGetProductsQuery } from '../products/productApiSlice'
import PayButton from '../payments/PayButton'
import useAuth from '../../hooks/useAuth'
import Grid from '@mui/material/Unstable_Grid2'
import json2mq from 'json2mq'
import useMediaQuery from '@mui/material/useMediaQuery'




const KEEPSHOPPING = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[50]),
  backgroundColor: grey[50],
  '&:hover': {
    backgroundColor: grey[200],
    border: '1px #9e9e9e solid'
  },
  border: '1px #bdbdbd solid',
}))



const STICKY = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    position: 'fixed'
  }
}))



const ShoppingCart = () => {

  const matches = useMediaQuery(
    json2mq({
      maxWidth: 899
    }),
  )

  let direction = matches ? 'column-reverse' : 'row'


  const navigate = useNavigate()
  const { username } = useAuth()


  const [cartId, setCartId] = useState(localStorage.getItem('BookShopCartId') || null)
  const [isReady, setIsReady] = useState(false)
  const { product } = useGetProductsQuery('productList', {
    selectFromResult: ({ data }) => ({
      product: data?.entities[cartId]
    })
  })

  // check current width and change row to column-reverse

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true)
    }, 1000)
  }, [])

  let content

  if (!isReady) {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LoadingMessage />
      </Box >
    )
  }

  if (isReady && product?.details?.length === 0 || cartId == null) {
    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6'>
          Your cart is currently empty.
        </Typography>
        <Link to='/' component={RouterLink} underline='none' color='#1976d2' >Keep Shopping to K Book Shop</Link>
      </Box >
    )
  }

  if (isReady && cartId && product?.details?.length > 0) {

    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant='h5'>SHOPPING CART</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} >
          <Grid container spacing={6} direction={direction}>
            {/* {checkoutSm} */}
            <Grid xs={12} sm={12} md={7}>
              <Box sx={{ maxWidth: '300', height: '100%' }}>
                {product.details.map(product =>
                  <CartList key={product.bookId} product={product} />
                )}
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={5}>
              <STICKY sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
                <Box sx={{ border: '1px solid lightGrey', borderRadius: '3%' }}>
                  <Typography sx={{ mt: 4, ml: 2, mr: 2 }}>ORDER SUMMARY | {product.totalcounts} ITEM(S)</Typography>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 4, ml: 2, mr: 2
                  }} >
                    <Typography>SUBTOTAL</Typography>
                    <Typography>CAD $ {product.totalprice.toFixed(2)}</Typography>
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
                    <Typography>CAD $ {product.totalprice.toFixed(2)}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
                  <PayButton product={product} cartId={cartId} />
                  <KEEPSHOPPING variant='contained' sx={{ mt: 2, mb: 3 }} onClick={() => navigate('/')}>COUTINUE SHOPPING</KEEPSHOPPING>
                </Box>
              </STICKY>
            </Grid>
          </Grid>
        </Box>
      </Box >
    )
  }



  return content
}

export default ShoppingCart

