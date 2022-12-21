import React from 'react'
import { Typography, Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'




const Image = ({ step }) => {

  return (
    <Box sx={{ flexGrow: 1, p: 1, maxWidth: 600 }}>
      <Grid container spacing={3}>
        <Grid xs={5}>
          <Box
            component="img"
            sx={{ height: 400, width: '100%' }}
            src={step.image}
            alt={step.title}
          />
        </Grid>
        <Grid xs={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5'>{step.title}</Typography>
          <br />
          <Typography variant='h6'>By: {step.author}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Image