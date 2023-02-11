import {
  Paper, Box, Typography, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Link
} from '@mui/material'
import styled from 'styled-components'
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom'
import React, { useState } from 'react'
import { useGetOrdersQuery } from '../order/ordersApiSlice'
import { useGetProductsQuery } from '../products/productApiSlice'
import LoadingMessage from '../../components/LoadingMessage'
import { useEffect } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Grid from '@mui/material/Unstable_Grid2'


const Container = styled.img`
    width:100%;
    height: 100%;
    padding: 0;
    margin: 0;
`


const PaymentSuccess = () => {

  const { id } = useParams()

  const currentId = id

  const { product } = useGetProductsQuery('productsList', {
    selectFromResult: ({ data }) => ({
      product: data?.entities[currentId]
    })
  })

  const { order } = useGetOrdersQuery('ordersList', {
    selectFromResult: ({ data }) => ({
      order: data?.entities[product?.paymentId]
    })
  })

  useEffect(() => {
    if (order) {
      localStorage.removeItem('BookShopCartId')
    }
  }, [order])

  let content

  if (!id || !order) content = <LoadingMessage />

  if (!id && order.payment_status !== 'paid') {
    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Payment is Unsuccessful, Please try Again.</Typography>
        <Link to='/carts' component={RouterLink} underline="none" color='white' >Back to Cart</Link>
      </Box >
    )
  }

  if (order && order.payment_status === 'paid') {
    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

        <Paper sx={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ m: 3 }}>Thank you for Shopping with Us!</Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Link to='/' component={RouterLink} underline="none" sx={{ mb: 3, mr: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >Keep Shopping<ShoppingCartIcon /></Link>
          </Box>

          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'space-between' }} >
              <Grid xs={12} sm={6} md={6}>
                <Box>
                  <Typography> User Info:</Typography>
                  <Typography> User Name: {order.user.username}</Typography>
                  <Typography> Email: {order.user.email}</Typography>
                </Box>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <Box>
                  <Typography>Ship To:</Typography>
                  <Typography> Name: {order.shipping.name}</Typography>
                  <Typography> Email: {order.shipping.email}</Typography>
                  <Typography> Contact: {order.shipping.phone}</Typography>
                  <Typography>Address:</Typography>
                  <Typography> Steet: {order.shipping.address.line1}</Typography>
                  <Typography> City: {order.shipping.address.city}</Typography>
                  <Typography> Country: {order.shipping.address.country}</Typography>
                  <Typography> Postal Code: {order.shipping.address.postal_code}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Typography variant='h5' sx={{ m: 3 }} >Product Details:</Typography>
          <Box sx={{ width: '80%' }}>
            <Box >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1 }}>
                <Typography >Quantity:</Typography>
                <Typography>{order.products.totalcounts}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>$ {(order.total / 100).toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1 }}>
                <Typography>Shipping Fee:</Typography>
                {order.total - order.subtotal === 0 ?
                  <Typography>Free</Typography>
                  :
                  <Typography>$ {((order.total - order.subtotal) / 100).toFixed(2)}</Typography>
                }

              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', m: 1 }}>
              <Typography>Total: $ {(order.total / 100).toFixed(2)}</Typography>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid grey', '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">Product Image</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantities</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.products?.details?.map(product =>
                  <TableRow key={product.bookId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Paper sx={{ height: 100, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Container src={product.image} />
                      </Paper>
                    </TableCell>
                    <TableCell align="center">{product.title}</TableCell>
                    <TableCell align="center" >${product.price.toFixed(2)}</TableCell>
                    <TableCell align="center">{product.quantity}</TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </TableContainer>
        </Paper >
      </Box >
    )
  }

  return content
}

export default PaymentSuccess