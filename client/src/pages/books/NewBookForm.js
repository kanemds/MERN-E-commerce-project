import React, { useEffect, useState, useRef } from 'react'
import { OutlinedInput, Button, Box, Card, CardMedia, Typography, Modal, Paper, ImageListItem, ImageList } from '@mui/material'
import styled from 'styled-components'

const Container = styled.img`
    width:auto;
    height: 100%;
    padding: 0;
    margin: 0;
`


const NewBookForm = () => {

  const [image, setImage] = useState(null)


  useEffect(() => {
    localStorage.getItem('preview')
  }, [image])

  const handleClear = () => {
    localStorage.removeItem('preview')
    setImage(null)
  }


  const handleImage = e => {
    const file = e.target.files[0]
    const previewImage = URL.createObjectURL(file)
    setImage(file)
    localStorage.setItem('preview', previewImage)
  }


  return (

    <Box>
      {
        localStorage.getItem('preview') ?
          < ImageList >

            <ImageListItem sx={{ height: 380, width: 340 }}>
              <Paper sx={{ height: 370, width: 320, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container src={localStorage.getItem('preview')} />
              </Paper>
            </ImageListItem>

          </ImageList >
          :
          <Paper sx={{ height: 400, width: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Product Picture</Typography>
          </Paper>
      }



      <Box>
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" >
            Upload
          </Button>
        </label>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          onChange={handleImage}
        />
      </Box>
      <Button variant="contained" onClick={handleClear}>Clear</Button>
    </Box >
  )
}

export default NewBookForm