import { Typography, Paper } from '@mui/material'
import React from 'react'
import LoadingMessage from '../../components/LoadingMessage'
import useAuth from '../../hooks/useAuth'
import { useGetOrdersQuery } from './ordersApiSlice'
import Grid from '@mui/material/Unstable_Grid2'

import Order from './Order'

const OrdersList = () => {

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetOrdersQuery('odersList', {
    pollingInterval: 15 * 60 * 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })


  let content

  if (isLoading) content = <LoadingMessage />

  if (isError) content = <Typography> {error?.data?.message}</Typography>

  if (isSuccess) {

    const { ids } = orders


    const tableContent = ids.map(orderId => <Order key={orderId} orderId={orderId} />)

    content = (
      <Paper sx={{ height: '100%', mb: 10 }}>


        <Grid container sx={{ display: 'flex', alignItems: 'center', p: 3, borderBottom: 'solid 1px black' }} >
          <Grid xs={10} sm={6} md={4} >
            <Typography>Order Id</Typography>
          </Grid>
          <Grid xs={0} sm={3} md={2}>
            <Typography sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>Purchased At</Typography>
          </Grid>
          <Grid xs={0} sm={0} md={2} >
            <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>Name</Typography>
          </Grid>
          <Grid xs={0} sm={0} md={2} >
            <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>Email</Typography>
          </Grid>
          <Grid xs={2} sm={1} md={1} >
            <Typography >Edit</Typography>
          </Grid>
        </Grid>

        {tableContent}

      </Paper >
    )
  }

  return content
}

export default OrdersList