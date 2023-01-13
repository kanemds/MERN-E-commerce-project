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

const Container = styled.img`
    width:100%;
    height: 100%;
    padding: 0;
    margin: 0;
`


const PaymentSuccess = () => {

  const { id } = useParams()

  const { product } = useGetProductsQuery('productsList', {
    selectFromResult: ({ data }) => ({
      product: data?.entities[id]
    })
  })

  const { order } = useGetOrdersQuery('ordersList', {
    selectFromResult: ({ data }) => ({
      order: data?.entities[product?.paymentId]
    })
  })

  useEffect(() => {
    if (product && order) {
      localStorage.removeItem('BookShopCartId')
    }
  })

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

        <Paper sx={{ width: '800px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ m: 3 }}>Thank you for Shopping with Us!</Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

            <Box sx={{ width: '40%' }}>
              <Typography> User Info:</Typography>
              <Typography> User Name: {order.user.username}</Typography>
              <Typography> Email: {order.user.email}</Typography>
            </Box>

            <Box sx={{ width: '40%' }}>
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
                <TableRow>
                  <TableCell align="center">Product Image</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantities</TableCell>
                </TableRow>
              </TableHead>
              {order?.products?.details?.map(product =>
                <TableBody key={product.bookId}>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Paper sx={{ height: 100, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Container src={product.image} />
                      </Paper>
                    </TableCell>
                    <TableCell align="center">{product.title}</TableCell>
                    <TableCell align="center" >${product.price.toFixed(2)}</TableCell>
                    <TableCell align="center">{product.quantity}</TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper >
      </Box >
    )
  }

  return content
}

export default PaymentSuccess