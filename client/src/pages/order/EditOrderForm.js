import React from 'react'
import {
  Paper, Box, Button, TextField, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select,
  Typography, Table, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material'
import { useUpdateOrderMutation } from './ordersApiSlice'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import EditOrderContentTable from './EditOrderContentTable'

const EditOrderForm = ({ order }) => {

  console.log(order)

  const [updateOrder, {
    isLoading,
    isSuccess,
    isError,
    error,
  }] = useUpdateOrderMutation()

  const tableContent = order?.products?.details?.length && order?.products?.details?.map(product => <EditOrderContentTable key={product.bookId} product={product} />)

  let content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {error ?
        <Paper sx={{ width: '600px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
        </Paper>
        :
        <Paper sx={{ width: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ p: 3 }} >Edit Order</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='User Name' variant='outlined' required sx={{ m: 3 }}
            value={order.user.username}
          />
          <TextField fullWidth autoComplete='off' type='text' label='User Email' variant='outlined' required sx={{ m: 3 }}
            value={order.user.email}
          />

          <Typography>Ship To:</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='Receiver Name' variant='outlined' required sx={{ m: 3 }}
            value={order.shipping.name}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Receiver Email' variant='outlined' required sx={{ m: 3 }}
            value={order.shipping.name}
          />
          <Typography>Address:</Typography>

          <TextField fullWidth autoComplete='off' type='text' label='Street' variant='outlined' required sx={{ m: 3 }}
            value={order.shipping.address.line1}
          />
          <TextField fullWidth autoComplete='off' type='text' label='City' variant='outlined' required sx={{ m: 3 }}
            value={order.shipping.address.city}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Country' variant='outlined' required sx={{ m: 3 }}
            value={order.shipping.address.country}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Postal Code' variant='outlined' required sx={{ m: 3 }}
            value={order.shipping.address.postal_code}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Contact Number' variant='outlined' required sx={{ m: 3 }}
            value={order.shipping.phone}
          />

          <Typography>Product Details:</Typography>
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
                <Typography>$ {((order.total - order.subtotal) / 100).toFixed(2)}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', m: 1 }}>
              <Typography>Total: $ {(order.total / 100).toFixed(2)}</Typography>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Product Image</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantities</TableCell>
                </TableRow>
              </TableHead>
              {tableContent}
            </Table>
          </TableContainer>


          <Box sx={{ m: 3 }}>
            {/* <Button variant="contained" disabled={!canSave} onClick={handleSubmit} sx={{ mr: 3 }}>Submit</Button> */}
            <Button variant="contained"><Link to='/dash/orders' component={RouterLink} underline="none" color='white' >Cancel</Link></Button>
          </Box>

        </Paper>
      }

    </Box >
  )



  return content
}

export default EditOrderForm