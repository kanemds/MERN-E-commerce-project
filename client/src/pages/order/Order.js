import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetOrdersQuery } from './ordersApiSlice'
import EditIcon from '@mui/icons-material/Edit'
import { TableBody, TableCell, TableRow, Button, Typography } from '@mui/material'
import { memo } from 'react'
import Grid from '@mui/material/Unstable_Grid2'

const Order = ({ orderId }) => {

  const navigate = useNavigate()

  const { order } = useGetOrdersQuery('ordersList', {
    selectFromResult: ({ data }) => ({
      order: data?.entities[orderId]
    })
  })


  if (order) {
    const purchasedAt = new Date(order?.createdAt).toLocaleString('en-US', {
      day: 'numeric', month: 'long'
    })

    const handleEdit = () => navigate(`/dash/orders/${orderId}`)

    return (
      <TableBody>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, flexGrow: 1 }}>
          <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
            <Grid xs={8} sm={6} md={4} >
              <TableCell >{orderId}</TableCell>
            </Grid>
            <Grid xs={0} sm={3} md={2} ><TableCell sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>{purchasedAt}</TableCell></Grid>
            <Grid xs={0} sm={0} md={2} ><TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>{order.user.username}</TableCell></Grid>
            <Grid xs={0} sm={0} md={2}><TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>{order.user.email}</TableCell></Grid>
            <Grid xs={4} sm={1} md={1} >
              <TableCell>
                <Button sx={{
                  width: 0,
                  height: 0,
                  m: 0,
                  p: 0
                }} onClick={handleEdit}>
                  <EditIcon />
                </Button>
              </TableCell>
            </Grid>
          </Grid>


        </TableRow>
      </TableBody >
    )
  } else {
    return null
  }
}

const memoizedOrder = memo(Order)
export default memoizedOrder