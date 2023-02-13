import React from 'react'
import { Typography, Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import json2mq from 'json2mq'
import useMediaQuery from '@mui/material/useMediaQuery'


const Image = ({ step }) => {

  const windowHeight600 = useMediaQuery(
    json2mq({
      maxWidth: 600,
      minWidth: 401
    })
  )
  const windowHeight400 = useMediaQuery(
    json2mq({
      maxWidth: 400
    })
  )

  const imgHeight = windowHeight600 ? 280 : windowHeight400 ? 180 : 400

  return (
    <Box sx={{ flexGrow: 1, p: 1, maxWidth: 600 }}>
      <Grid container spacing={3}>
        <Grid xs={5}>
          <Box
            component="img"
            sx={{ height: imgHeight, width: '100%' }}
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