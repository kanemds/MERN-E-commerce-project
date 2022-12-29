import { Box, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'


const CartList = ({ details }) => {


  return (
    <>
      {
        details.map(product =>
          <Grid key={product.bookId} container sx={{ width: '100%', flexGrow: 1, borderBottom: '1px solid lightGrey', mt: 3 }}>
            <Grid xs={2}>
              <Box
                component="img"
                sx={{ width: '100%', height: '180px' }}
                src={product.image}
                alt={product.title}
              />
            </Grid>
            <Grid xs={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='h5'>{product.title}</Typography>
              <br />
              <Typography variant='h6'>By: {product.author}</Typography>

            </Grid>
          </Grid>

        )
      }
    </>

  )
}

export default CartList