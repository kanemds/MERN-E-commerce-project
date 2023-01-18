import React from 'react'
import {
  Paper, Box, Button, TextField, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select,
  Typography, Table, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material'
import { useDeleteOrderMutation, useUpdateOrderMutation } from './ordersApiSlice'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import EditOrderContentTable from './EditOrderContentTable'
import { styled } from '@mui/system'
import { useState } from 'react'
import { useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2'

const DisabledTextField = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000"
  },
  "& label.Mui-disabled": {
    color: 'rgba(0, 0, 0, 0.6)'
  }
}))

const EditOrderForm = ({ order }) => {

  const navigate = useNavigate()

  const [name, setName] = useState(order.shipping.name)
  const [email, setEmail] = useState(order.shipping.email)
  const [street, setStreet] = useState(order.shipping.address.line1)
  const [city, setCity] = useState(order.shipping.address.city)
  const [country, setCountry] = useState(order.shipping.address.country)
  const [postalCode, setPostalCode] = useState(order.shipping.address.postal_code)
  const [phone, setPhone] = useState(order.shipping.phone)


  const [updateOrder, {
    isLoading,
    isSuccess,
    isError,
    error,
  }] = useUpdateOrderMutation()

  const [deleteOrder] = useDeleteOrderMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate('/dash/orders')
    }
  }, [isSuccess])


  const handleUpdate = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateOrder({ id: order._id, name, email, street, city, country, postalCode, phone })
    }
  }

  const handleDelete = async () => {
    await deleteOrder({ id: order._id })
  }

  const canSave = [name.length, email.length, street.length, city.length, country.length, postalCode.length, phone.length].every(Boolean) && !isLoading

  const tableContent = order?.products?.details?.length && order?.products?.details?.map(product => <EditOrderContentTable key={product.bookId} product={product} />)

  let content = (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
      {error ?
        <Paper sx={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
        </Paper>
        :
        <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ p: 3 }} >Edit Order</Typography>
          <DisabledTextField fullWidth autoComplete='off' type='text' label='User Name' variant='outlined' required
            value={order.user.username}
          />
          <DisabledTextField fullWidth autoComplete='off' type='text' label='User Email' variant='outlined' required
            sx={{ mt: 3 }}
            value={order.user.email}
          />

          <Typography sx={{ mt: 3 }}>Ship To:</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='Receiver Name' variant='outlined' required
            value={name} onChange={e => setName(e.target.value)} sx={{ mt: 3 }}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Receiver Email' variant='outlined' required
            sx={{ mt: 3 }}
          />
          <Typography sx={{ mt: 3 }}>Address:</Typography>

          <TextField fullWidth autoComplete='off' type='text' label='Street' variant='outlined' required
            value={street} onChange={e => setStreet(e.target.value)} sx={{ mt: 3 }}
          />
          <TextField fullWidth autoComplete='off' type='text' label='City' variant='outlined' required
            value={city} onChange={e => setCity(e.target.value)} sx={{ mt: 3 }}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Country' variant='outlined' required
            value={country} onChange={e => setCountry(e.target.value)} sx={{ mt: 3 }}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Postal Code' variant='outlined' required
            value={postalCode} onChange={e => setPostalCode(e.target.value)} sx={{ mt: 3 }}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Contact Number' variant='outlined' required
            value={phone} onChange={e => setPhone(e.target.value)} sx={{ mt: 3 }}
          />

          <Typography sx={{ mt: 3 }}>Product Details:</Typography>
          <Box sx={{ width: '80%' }}>
            <Box >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography >Quantity:</Typography>
                <Typography>{order.products.totalcounts}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Subtotal:</Typography>
                <Typography>$ {(order.total / 100).toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Shipping Fee:</Typography>
                {order.total - order.subtotal === 0 ?
                  <Typography>Free</Typography>
                  :
                  <Typography>$ {((order.total - order.subtotal) / 100).toFixed(2)}</Typography>
                }
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Typography>Total: $ {(order.total / 100).toFixed(2)}</Typography>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid grey', '&:last-child td, &:last-child th': { border: 0 } }}>
                  <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
                    <Grid xs={0} sm={4}>
                      <TableCell sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }} >Product Image</TableCell>
                    </Grid>
                    <Grid xs={5} sm={3}>
                      <TableCell >Name</TableCell>
                    </Grid>
                    <Grid xs={3} sm={2}>
                      <TableCell >Price</TableCell>
                    </Grid>
                    <Grid xs={4} sm={3}>
                      <TableCell>Quantities</TableCell>
                    </Grid>
                  </Grid>
                </TableRow>
              </TableHead>
              {tableContent}
            </Table>
          </TableContainer>


          <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={3}>
              <Grid xs={4}>
                <Button variant="contained" disabled={!canSave} onClick={handleUpdate} >Update</Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="contained" onClick={handleDelete}>Delete</Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="contained"><Link to='/dash/orders' component={RouterLink} underline="none" color='white' >Cancel</Link></Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      }
    </Box >
  )
  return content
}

export default EditOrderForm