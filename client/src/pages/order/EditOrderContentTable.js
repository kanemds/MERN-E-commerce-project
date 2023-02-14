import React from 'react'
import { Typography, Box, Paper } from '@mui/material'
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
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
        <Grid xs={0} sm={4} sx={{ display: { xs: 'none', sm: 'inline', md: 'inline' } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ height: 100, width: 80 }}>
              <Container src={product.image} />
            </Paper>
          </Box>
        </Grid>
        <Grid xs={5} sm={3}>
          <Typography>{product.title}</Typography>
        </Grid>
        <Grid xs={3} sm={2.8}>
          <Typography  >${product.price.toFixed(2)}</Typography>
        </Grid>
        <Grid xs={4} sm={2} >
          <Typography sx={{ display: 'flex', justifyContent: 'center' }}>{product.quantity}</Typography>
        </Grid>
      </Grid>

    </Box>
  )
}

export default EditOrderContentTable