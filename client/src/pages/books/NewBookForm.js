import React, { useEffect, useState, } from 'react'
import { Button, Box, TextField, InputAdornment, Typography, Paper, ImageListItem, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import styled from 'styled-components'
import { useAddNewBookMutation } from './booksApiSlice'
import { CATEGORY } from '../../config/category'
import { useNavigate } from 'react-router-dom'

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

  const navigate = useNavigate()

  const [addNewBook, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewBookMutation()

  const [image, setImage] = useState()
  const [preview, setPreview] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [inStocks, setInStocks] = useState(0)
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [imageName, setImageName] = useState('')


  const type = Object.values(CATEGORY)

  useEffect(() => {
    if (isSuccess) {
      setImage('')
      setPreview('')
      setTitle('')
      setDescription('')
      setAuthor('')
      setCategory('')
      setImageName('')
      setPrice('')
      navigate('/dash/books')
    }
  }, [isSuccess, navigate])

  const handleClear = () => {
    // sessionStorage.removeItem('preview')
    setPreview('')
    setImageName('')
    setImage()
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
    setImage(file)
    setPreview(url)
    setImageName(file.name)
  }

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', image)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('author', author)
    formData.append('inStocks', inStocks)
    formData.append('category', category)
    formData.append('price', price)
    addNewBook(formData)

    // checking if data stored in formData
    // for (const value of formData.values()) {
    //   console.log(value)
    // }
    // addNewBook(formData)

  }

  const canSave = [title.length, description.length, author.length, image, category.length, inStocks, price].every(Boolean) && !isLoading


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
              onChange={e => setDescription(e.target.value)}
            />
            <TextField fullWidth autoComplete='off' type='text' label='Author' variant='outlined' required sx={{ m: 3 }}
              onChange={e => setAuthor(e.target.value)}
            />
            <TextField fullWidth autoComplete='off' type='number' label='InStocks' variant='outlined' required sx={{ m: 3 }}
              value={inStocks}
              onChange={e => setInStocks(e.target.value)}
            />
            <TextField fullWidth autoComplete='off' type='number' label='Price' variant='outlined' required sx={{ m: 3 }}
              value={price}
              onChange={e => setPrice(e.target.value)}
            />

            <FormControl required fullWidth sx={{ m: 3 }}>
              <InputLabel id="demo-simple-select-label">category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {type.map((name, index) =>
                  <MenuItem key={index} value={name}>{name}</MenuItem>
                )}
              </Select>
            </FormControl>

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