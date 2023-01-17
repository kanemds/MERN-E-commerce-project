import { Typography, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
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
      <TableContainer component={Paper} sx={{ height: '100%' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ borderBottom: '1px solid grey', '&:last-child td, &:last-child th': { border: 0 } }}>
              <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
                <Grid xs={8} sm={6} md={4} >
                  <TableCell>Order Id</TableCell>
                </Grid>
                <Grid xs={0} sm={3} md={2} sx={{ display: 'flex' }}>
                  <TableCell sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>Purchased At</TableCell>
                </Grid>
                <Grid xs={0} sm={0} md={2} >
                  <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>Name</TableCell>
                </Grid>
                <Grid xs={0} sm={0} md={2} >
                  <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}>Email</TableCell>
                </Grid>
                <Grid xs={4} sm={1} md={1} >
                  <TableCell >Edit</TableCell>
                </Grid>
              </Grid>

            </TableRow>

          </TableHead>
          {tableContent}
        </Table>
      </TableContainer >
    )
  }

  return content
}

export default OrdersList