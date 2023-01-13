import React from 'react'
import { TableBody, TableCell, TableRow, Paper } from '@mui/material'
import styled from 'styled-components'

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
        <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper sx={{ height: 100, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container src={product.image} />
          </Paper>
        </TableCell>
        <TableCell align="center">{product.title}</TableCell>
        <TableCell align="center" >${product.price.toFixed(2)}</TableCell>
        <TableCell align="center">{product.quantity}</TableCell>
      </TableRow>
    </TableBody>
  )
}

export default EditOrderContentTable