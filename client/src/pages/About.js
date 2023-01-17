import { Typography, Box, Paper } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <Paper sx={{ minWidth: 650, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant='h4' sx={{ m: 2 }}>
        This project App is for Learning Perpose
      </Typography>
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