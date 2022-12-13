import React, { useEffect, useState, useRef } from 'react'
import { OutlinedInput, Button, Box, Card, CardMedia, Typography, Modal, Paper, ImageListItem, ImageList } from '@mui/material'
import styled from 'styled-components'
import { useAddNewBookMutation } from './booksApiSlice'

const Container = styled.img`
    width:auto;
    height: 100%;
    padding: 0;
    margin: 0;
`


const NewBookForm = () => {

  const [addNewBook, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewBookMutation()

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('preview')
    setPreview(data)
  }, [])

  useEffect(() => {
    localStorage.getItem('preview')
  }, [preview])

  const handleClear = () => {
    localStorage.removeItem('preview')
    setPreview(null)
    setImage(null)
  }


  const handleImage = async (e) => {
    const file = await e.target.files[0]

    // return short URL
    // const previewImage = URL.createObjectURL(file)
    // setImage(file)
    // localStorage.setItem('preview', previewImage)

    // return base64
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const currentImageURL = reader.result
      setPreview(currentImageURL)
      setImage(file)
      localStorage.setItem('preview', currentImageURL)
    }
  }

  console.log(image)
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', image)
    // checking if data stored in formData
    // for (const value of formData.values()) {
    //   console.log(value)
    // }
    addNewBook(formData)
  }

  const content = (
    <Box>
      {error ?
        <Box>
          {error.data.message}
        </Box>
        :
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
                <Typography variant='h5'>Product Preview</Typography>
              </Paper>
          }


          <Box>
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span" >
                Upload Picture
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
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box >
      }
    </Box>

  )

  return content
}

export default NewBookForm