import React, { useEffect, useState, useRef } from 'react'
import { OutlinedInput, Button, Box, TextField, Card, CardMedia, InputAdornment, Typography, Modal, Paper, ImageListItem, ImageList } from '@mui/material'
import styled from 'styled-components'
import { useAddNewBookMutation } from './booksApiSlice'

const DisabledTextField = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000"
  },
  "& label.Mui-disabled": {
    color: 'rgba(0, 0, 0, 0.6)'
  }
}))

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

  const [image, setImage] = useState({})
  const [preview, setPreview] = useState('')

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [imageName, setImageName] = useState('')




  const handleClear = () => {
    // sessionStorage.removeItem('preview')
    setPreview('')
    setImageName('')
    setImage({})
  }


  // decided not to use presist

  // useEffect(() => {
  //   const data = sessionStorage.getItem('preview')
  //   setPreview(data)
  // }, [preview])

  // const handleImage = async (e) => {
  //   const file = await e.target.files[0]

  //   // return short URL
  //   // const previewImage = URL.createObjectURL(file)
  //   // setImage(file)
  //   // localStorage.setItem('preview', previewImage)
  //   // return base64

  //   const reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   reader.onloadend = () => {
  //     const currentImageURL = reader.result
  //     setImage(file)
  //     setPreview(currentImageURL)
  //     sessionStorage.setItem('preview', currentImageURL)
  //   }
  // }

  // end of presist

  const handleImage = async (e) => {
    const file = e.target.files[0]
    const url = await URL.createObjectURL(file)
    console.log(url)
    setImage(file)
    setPreview(url)
    setImageName(file.name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', image)

    // checking if data stored in formData
    // for (const value of formData.values()) {
    //   console.log(value)
    // }
    addNewBook({ formData, title, text, author })
  }

  const canSave = [title.length, text.length, author.length, image].every(Boolean) && !isLoading


  const content = (
    <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h5' sx={{ p: 3 }} >New Book</Typography>
      {error ?
        <Paper sx={{ width: '600px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
        </Paper>
        :
        <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-around' }} >

          <Box>
            {
              image && preview ?

                <ImageListItem >
                  <Paper sx={{ height: 600, width: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Container src={preview} />
                  </Paper>
                </ImageListItem>
                :
                <Paper sx={{ height: 600, width: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant='h5'>Product Preview</Typography>
                </Paper>
            }

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <Button variant="contained" onClick={handleClear}>Clear</Button>
            </Box>
          </Box>
          <Box>
            <TextField fullWidth autoComplete='off' type='text' label='Title' variant='outlined' required sx={{ m: 3 }}
              onChange={e => setTitle(e.target.value)}
            />
            <TextField fullWidth rows={8} multiline autoComplete='off' type='text' label='Description' variant='outlined' required sx={{ m: 3 }}
              onChange={e => setText(e.target.value)}
            />
            <TextField fullWidth autoComplete='off' type='text' label='Author' variant='outlined' required sx={{ m: 3 }}
              onChange={e => setAuthor(e.target.value)}
            />
            <DisabledTextField fullWidth autoComplete='off' type='text' label='File Name' variant='outlined' required sx={{ m: 3 }}
              disabled={true}
              value={imageName}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box >
                      <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span" >
                          Upload Image
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
                  </InputAdornment>
                ),
              }}
              onChange={e => setAuthor(e.target.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button disabled={!canSave} variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
          </Box>

        </Box >
      }
    </Paper >

  )

  return content
}

export default NewBookForm