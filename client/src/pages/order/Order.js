import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetOrdersQuery } from './ordersApiSlice'
import EditIcon from '@mui/icons-material/Edit'
import { TableBody, TableCell, TableRow, Button, Typography } from '@mui/material'
import { memo } from 'react'

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
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="left">{orderId}</TableCell>
          <TableCell align="left">{purchasedAt}</TableCell>
          <TableCell align="left">{order.user.username}</TableCell>
          <TableCell align="left">{order.user.email}</TableCell>
          <TableCell align="center">
            <Button onClick={handleEdit}>
              <EditIcon />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    return null
  }
}

const memoizedOrder = memo(Order)
export default memoizedOrder