import React, { useEffect, useState, } from 'react'
import { Button, Box, TextField, InputAdornment, Typography, Paper, ImageListItem, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import styled from 'styled-components'
import { useUpdateBookMutation, useDeleteBookMutation } from './booksApiSlice'
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
    setImage(file)
    setImageName(file.name)
  }

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  const handleSubmit = (e) => {
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
    } else {
      formData.append('id', book.id)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('author', author)
      formData.append('inStocks', inStocks)
      formData.append('category', category)
    }

    updateBook(formData)

  }

  const handleDelete = async () => {
    await deleteBook({ id: book.id })
  }

  let canSave
  if (image) {
    canSave = [title.length, description.length, author.length, image, category.length].every(Boolean) && !isLoading
  } else {
    canSave = [title.length, description.length, author.length, category.length].every(Boolean) && !isLoading
  }


  const content = (
    <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h5' sx={{ p: 3 }} >Edit Book</Typography>
      {error ?
        <Paper sx={{ width: '600px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mb: 5 }}>{error?.data?.message}</Typography>
        </Paper>
        :
        <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-around' }} >

          <Box>
            {
              preview ?

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
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextField fullWidth rows={8} multiline autoComplete='off' type='text' label='Description' variant='outlined' required sx={{ m: 3 }}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <TextField fullWidth autoComplete='off' type='text' label='Author' variant='outlined' required sx={{ m: 3 }}
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
            <TextField fullWidth autoComplete='off' type='number' label='InStocks' variant='outlined' required sx={{ m: 3 }}
              value={inStocks}
              onChange={e => setInStocks(e.target.value)}
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
                {types.map((name, index) =>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button disabled={!canSave} variant="contained" onClick={handleSubmit} sx={{ mr: 3 }}>Update</Button>
              <Button variant="contained" onClick={handleDelete} sx={{ mr: 3 }}>Delete</Button>
              <Button variant="contained" onClick={() => navigate('/dash/books')} >Back</Button>
            </Box>
          </Box>

        </Box >
      }
    </Paper >

  )

  return content
}



export default EditBookForm