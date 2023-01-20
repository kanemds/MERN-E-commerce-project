import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'


const RecentlyView = () => {

  let recentlyView = JSON.parse(localStorage.getItem('recentlyView')) || null
  console.log(recentlyView)


  return (
    <Box>
      <Typography variant='h4'>You may also interested in ?</Typography>

      {recentlyView.map(each =>
        <Button key={each.id} sx={{ width: 300, height: 300 }}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <Box
              key={each.id}
              component="img"
              sx={{ height: '140px', width: '100px' }}
              src={each.image}
              alt={each.title}
            />
            <Typography sx={{ p: 1 }}>{each.title}</Typography>
          </Paper>
        </Button>
      )}
    </Box>
  )
}

export default RecentlyView