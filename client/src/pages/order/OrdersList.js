import { Typography, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React from 'react'
import LoadingMessage from '../../components/LoadingMessage'
import useAuth from '../../hooks/useAuth'
import { useGetOrdersQuery } from './ordersApiSlice'

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
    const { ids, entities } = orders

    const tableContent = ids?.length && ids.map(orderId => <Order key={orderId} orderId={orderId} />)

    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="left">Purchased At</TableCell>
              <TableCell align="left">Customer Name</TableCell>
              <TableCell align="left">Customer Email</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          {tableContent}
        </Table>
      </TableContainer>
    )
  }

  return content
}

export default OrdersList