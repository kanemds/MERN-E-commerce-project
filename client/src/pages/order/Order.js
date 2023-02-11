import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetOrdersQuery } from './ordersApiSlice'
import EditIcon from '@mui/icons-material/Edit'
import { Button, Typography, Box } from '@mui/material'
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
      <Box sx={{ p: 4 }}>
        <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
          <Grid xs={8} sm={6} md={4} >
            <Typography >{orderId}</Typography>
          </Grid>
          <Grid xs={0} sm={3} md={2} ><Typography sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>{purchasedAt}</Typography></Grid>
          <Grid xs={0} sm={0} md={2} ><Typography sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>{order.user.username}</Typography></Grid>
          <Grid xs={0} sm={0} md={2}><Typography sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>{order.user.email}</Typography></Grid>
          <Grid xs={4} sm={1} md={1} >
            <Typography>
              <Button sx={{
                width: 0,
                height: 0,
                m: 0,
                p: 0
              }} onClick={handleEdit}>
                <EditIcon />
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box >
    )
  } else {
    return null
  }
}

const memoizedOrder = memo(Order)
export default memoizedOrder