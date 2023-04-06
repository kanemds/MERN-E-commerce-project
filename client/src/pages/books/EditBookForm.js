import React, { useEffect, useState, } from 'react'
import { Button, Box, TextField, InputAdornment, Typography, Paper, ImageListItem, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import styled from 'styled-components'
import { useUpdateBookMutation, useDeleteBookMutation } from './booksApiSlice'
import { CATEGORY } from '../../config/category'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2'

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
    width:300px;
    height: 100%;
    padding: 0;
    margin: 0;
`


const EditBookForm = ({ book }) => {

  const navigate = useNavigate()

  const [updateBook, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateBookMutation()

  const [deleteBook, {
    isSuccess: isDeletedSuccess,
    isError: isDeletedError,
    error: deletedError
  }] = useDeleteBookMutation()

  const [image, setImage] = useState('')
  const [preview, setPreview] = useState(book.image)

  const [title, setTitle] = useState(book.title)
  const [description, setDescription] = useState(book.description)
  const [author, setAuthor] = useState(book.author)
  const [inStocks, setInStocks] = useState(book.instocks)
  const [price, setPrice] = useState(book.price)
  const [category, setCategory] = useState(book.category)


  const [imageName, setImageName] = useState('') // will cause error if no value


  const types = Object.values(CATEGORY)


  useEffect(() => {
    if (isSuccess || isDeletedSuccess) {
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
  }, [isSuccess, isDeletedSuccess, navigate])

  const handleClear = () => {
    setPreview('')
    setImageName('')
    setImage('')
  }



  const handleImage = async (e) => {
    const file = e.target.files[0]
    // const url = await URL.createObjectURL(file) // might sometimes have a problem when dealing with large file
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result)
    }

    // // this also work
    // reader.onload = () => {
    //   setPreview(reader.result)
    // }
    // onerror for handle error

    setImage(file)
    setImageName(file.name)
  }

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    if (image && canSave) {
      formData.append('file', image)
      formData.append('id', book.id)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('author', author)
      formData.append('inStocks', inStocks)
      formData.append('category', category)
      formData.append('price', price)
    } else {
      formData.append('id', book.id)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('author', author)
      formData.append('inStocks', inStocks)
      formData.append('category', category)
      formData.append('price', price)
    }

    await updateBook(formData)

  }

  const handlePrice = (e) => {
    if (e.target.value <= 0) {
      setPrice(0)
    }
    setPrice(e.target.value)
  }

  const handleDelete = async () => {
    await deleteBook({ id: book.id })
    navigate('/dash/books')
  }

  let canSave
  if (image) {
    canSave = [title.length, description.length, author.length, image, category.length, price].every(Boolean) && !isLoading
  } else {
    canSave = [title.length, description.length, author.length, category.length, price].every(Boolean) && !isLoading
  }


  const content = (
    <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h5' sx={{ p: 3 }} >Edit Book</Typography>
      {error ?

        <Paper sx={{ width: '300px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
          <Button onClick={() => navigate(`/dash/books/${book.id}`)}> Back </Button>
        </Paper>

        :
        <Box sx={{ flexGrow: 1 }} >
          <Grid container spacing={4} sx={{ p: 3 }}>
            <Grid xs={12} sm={12} md={5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {
                  preview ?

                    <Paper sx={{ height: 400, width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Container src={preview} />
                    </Paper>

                    :
                    <Paper sx={{ height: 400, width: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant='h5'>Product Preview</Typography>
                    </Paper>
                }
                <Button variant="contained" onClick={handleClear} sx={{ mt: 3 }}>Clear</Button>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={7}>
              <Box>
                <TextField fullWidth autoComplete='off' type='text' label='Title' variant='outlined' required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <TextField fullWidth rows={8} multiline autoComplete='off' type='text' label='Description' variant='outlined' required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  sx={{ mt: 3 }}
                />
                <TextField fullWidth autoComplete='off' type='text' label='Author' variant='outlined' required
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  sx={{ mt: 3 }}
                />
                <TextField fullWidth autoComplete='off' type='number' label='InStocks' variant='outlined' required
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  value={inStocks}
                  onChange={e => setInStocks(e.target.value)}
                  sx={{ mt: 3 }}
                />
                <TextField fullWidth autoComplete='off' type='number' label='Price' variant='outlined' required
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  value={price}
                  onChange={handlePrice}
                  sx={{ mt: 3 }}
                />

                <FormControl required fullWidth sx={{ mt: 3 }}>
                  <InputLabel id="demo-simple-select-label">category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                  >
                    {types.map((name, index) =>
                      <MenuItem key={index} value={name}>{name}</MenuItem>
                    )}
                  </Select>
                </FormControl>

                <DisabledTextField fullWidth autoComplete='off' type='text' label='File Name' variant='outlined' required
                  sx={{ mt: 3 }}
                  disabled={true}
                  value={imageName}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box >
                          <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" >
                              Update Image
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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                  <Button disabled={!canSave} variant="contained" onClick={handleSubmit} sx={{ mr: 3 }}>Update</Button>
                  <Button variant="contained" onClick={handleDelete} sx={{ mr: 3 }}>Delete</Button>
                  <Button variant="contained" onClick={() => navigate('/dash/books')} >Back</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box >
      }

    </Paper >

  )

  return content
}



export default EditBookForm