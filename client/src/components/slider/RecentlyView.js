import { Box, Button, Paper, Typography, IconButton } from '@mui/material'

import React from 'react'



// import required modules
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "./styles.css"

// media query
import json2mq from 'json2mq'
import useMediaQuery from '@mui/material/useMediaQuery'


const RecentlyView = () => {

  let recentlyView = JSON.parse(localStorage.getItem('recentlyView')) || null

  const three = useMediaQuery(
    json2mq({
      maxWidth: 999,
      minWidth: 650
    }),
  )

  const two = useMediaQuery(
    json2mq({
      maxWidth: 649
    }),
  )

  const amountOfDisaply = three ? 3 : two ? 2 : 4

  return (

    <Swiper
      slidesPerView={amountOfDisaply}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {recentlyView.map(each =>
        <SwiperSlide key={each.id} >
          <Button sx={{ width: '100%', height: '100%' }} >
            <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }} >
              <Box
                key={each.id}
                component="img"
                src={each.image}
                alt={each.title}
              />
              <Box >
                <Typography sx={{ p: 1 }}>{each.title}</Typography>
              </Box>
            </Paper>
          </Button>
        </SwiperSlide>
      )}
    </Swiper>





  )
}

export default RecentlyView