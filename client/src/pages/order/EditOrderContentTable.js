import React from 'react'
import { TableBody, TableCell, TableRow, Paper, Box } from '@mui/material'
import styled from 'styled-components'
import Grid from '@mui/material/Unstable_Grid2'

const Container = styled.img`
    width:100%;
    height: 100%;
    padding: 0;
    margin: 0;
`




const EditOrderContentTable = ({ product }) => {


  return (
    <TableBody>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
          <Grid xs={0} sm={4}>
            <Box sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>
              <TableCell sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper sx={{ height: 100, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Container src={product.image} />
                </Paper>
              </TableCell>
            </Box>
          </Grid>
          <Grid xs={5} sm={3}>
            <TableCell>{product.title}</TableCell>
          </Grid>
          <Grid xs={3} sm={2}>
            <TableCell  >${product.price.toFixed(2)}</TableCell>
          </Grid>
          <Grid xs={4} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TableCell >{product.quantity}</TableCell>
          </Grid>
        </Grid>
      </TableRow>
    </TableBody>
  )
}

export default EditOrderContentTable