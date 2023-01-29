import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useGetBooksQuery } from './books/booksApiSlice'
import LoadingMessage from '../components/LoadingMessage'
import FrontPageDisplay from '../components/FrontPageDisplay'
import { CATEGORY } from '../config/category'
import { Link } from 'react-scroll'
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles'

const Gap = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginTop: 280,
    marginBottom: 500
  }
}))



const Public = () => {


  const types = Object.values(CATEGORY)



  const { books } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      books: data?.ids.map(id => data?.entities[id])
    })
  })


  let content

  if (!books) {
    content = <LoadingMessage />
  }

  if (books) {

    content = (
      <Box sx={{ flexGrow: 1 }}>

        <Grid container >
          <Grid xs={12} sm={12} md={3} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <Box position="fixed" sx={{ height: 'calc(70%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '360px' }}>
              {types?.map((category) =>

                <Link key={category} to={category} activeClass="active" className='scroll' spy={true} smooth={true} offset={-410} duration={600} >
                  <Typography variant='h6'>{category}</Typography>
                </Link>
              )}
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={9} >
            <Typography variant='h4'>This project is for Learning Purpose</Typography>
            {types?.map((category) => {
              let currentCategory = books.filter(book => book.category === category)
              return (
                <Gap key={category} id={`${category}`}  >
                  <FrontPageDisplay currentCategory={currentCategory} />
                </Gap>
              )
            }
            )}
          </Grid>
        </Grid>
      </Box >
    )
  }

  return content
}

export default Public