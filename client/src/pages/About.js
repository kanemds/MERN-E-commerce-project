import { Typography, Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'


const About = () => {



  return (
    <Paper sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <Typography variant='h5' sx={{ mb: 2 }}>
        About this App:
      </Typography>
      <Box sx={{ width: '70%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant='h5'>
          Frontend: <br />
          - react: RTK-Query, Redux-toolkit <br />
          - app style: Material UI<br />
          - image storage: Firebase <br />

        </Typography>
        <Typography variant='h5'>
          Backend:<br />
          - nodeJs: Express <br />
          - data storage: MongoDB <br />
        </Typography>
      </Box>
    </Paper>
  )
}

export default About