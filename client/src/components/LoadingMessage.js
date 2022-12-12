import ScaleLoader from 'react-spinners/ScaleLoader'
import { Typography, Box } from '@mui/material'

import React from 'react'

const LoadingMessage = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ mr: 1 }} variant='h5'>
        Loading
      </Typography>
      <ScaleLoader color='grey' height='15px' />
    </Box>
  )
}

export default LoadingMessage
