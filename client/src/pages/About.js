import { Typography, Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'


const About = () => {



  return (
    <Paper sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h5' >
            About this App:
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={6} >

          <Typography variant='h5'>
            Frontend: <br />
            - react: RTK-Query, Redux-toolkit <br />
            - payment: Stripe <br />
            - app style: Material UI<br />
            - using Grid to make the app responsive <br />
            - image upload: Firebase <br />
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={6}>
          <Typography variant='h5'>
            Backend:<br />
            MVC:An architectural pattern structure.<br />
            - nodeJs: Express <br />
            - data storage: MongoDB <br />
            - image storage: Firebase <br />
            - password encryption: Bcrypt  <br />
            - authorization key: Json Web Token (JWT)
          </Typography>
        </Grid>
      </Grid>
    </Paper >
  )
}

export default About