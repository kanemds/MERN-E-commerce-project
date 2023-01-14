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
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {error ?
        <Paper sx={{ width: '800px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
        </Paper>
        :
        <Paper sx={{ width: '800px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Typography variant='h5' sx={{ p: 3 }} >Edit Order</Typography>
          <DisabledTextField fullWidth autoComplete='off' type='text' label='User Name' variant='outlined' required sx={{ m: 3 }}
            value={order.user.username}
          />
          <DisabledTextField fullWidth autoComplete='off' type='text' label='User Email' variant='outlined' required sx={{ m: 3 }}
            value={order.user.email}
          />

          <Typography>Ship To:</Typography>
          <TextField fullWidth autoComplete='off' type='text' label='Receiver Name' variant='outlined' required sx={{ m: 3 }}
            value={name} onChange={e => setName(e.target.value)}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Receiver Email' variant='outlined' required sx={{ m: 3 }}
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <Typography>Address:</Typography>

          <TextField fullWidth autoComplete='off' type='text' label='Street' variant='outlined' required sx={{ m: 3 }}
            value={street} onChange={e => setStreet(e.target.value)}
          />
          <TextField fullWidth autoComplete='off' type='text' label='City' variant='outlined' required sx={{ m: 3 }}
            value={city} onChange={e => setCity(e.target.value)}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Country' variant='outlined' required sx={{ m: 3 }}
            value={country} onChange={e => setCountry(e.target.value)}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Postal Code' variant='outlined' required sx={{ m: 3 }}
            value={postalCode} onChange={e => setPostalCode(e.target.value)}
          />
          <TextField fullWidth autoComplete='off' type='text' label='Contact Number' variant='outlined' required sx={{ m: 3 }}
            value={phone} onChange={e => setPhone(e.target.value)}
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
              {tableContent}
            </Table>
          </TableContainer>


          <Box sx={{ m: 3 }}>
            <Button variant="contained" disabled={!canSave} onClick={handleUpdate} sx={{ mr: 3 }}>Update</Button>
            <Button variant="contained" onClick={handleDelete} sx={{ mr: 3 }}>Delete</Button>
            <Button variant="contained"><Link to='/dash/orders' component={RouterLink} underline="none" color='white' >Cancel</Link></Button>
          </Box>

        </Paper>
      }

    </Box >
  )
  return content
}

export default EditOrderForm