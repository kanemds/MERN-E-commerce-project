import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useGetBooksQuery } from './books/booksApiSlice'
import LoadingMessage from '../components/LoadingMessage'
import FrontPageDisplay from '../components/FrontPageDisplay'
import { CATEGORY } from '../config/category'
import { Link } from 'react-scroll'
import Grid from '@mui/material/Unstable_Grid2'


const Public = () => {



  const types = Object.values(CATEGORY)


  // const [selected, setSelected] = useState(types[0])
  // const [movement, setMovement] = useState(0)
  // const handleClick = (category, index) => {
  //   setSelected(category)
  //   document.getElementById(`${category}`).scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'center',
  //     inline: "start"
  //   })
  // }

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
      <Box >

        <Box position="fixed" sx={{ height: 'calc(70%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '360px' }}>
          {types?.map((category) =>

            <Link key={category} to={category} activeClass="active" className='scroll' spy={true} smooth={true} offset={-380} duration={600} >
              {category}
            </Link>
          )}
        </Box>

        {types?.map((category) => {
          let currentCategory = books.filter(book => book.category === category)
          return (
            <Paper key={category} id={`${category}`} sx={{ m: '300px', ml: '400px', width: '700px' }} >
              <FrontPageDisplay currentCategory={currentCategory} />
            </Paper>
          )
        }
        )}
      </Box >
    )
  }

  return content
}

export default Public