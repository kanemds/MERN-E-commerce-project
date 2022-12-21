import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useGetBooksQuery } from './books/booksApiSlice'
import LoadingMessage from '../components/LoadingMessage'
import FrontPageDisplay from '../components/FrontPageDisplay'
import { CATEGORY } from '../config/category'
import { Link } from 'react-scroll'
import Grid from '@mui/material/Unstable_Grid2'


const Public = () => {

  // force to top when refresh
  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }

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
      <Box sx={{ mt: 20 }} >

        <Box position="fixed" sx={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: '5%' }}>
          {types?.map((category) =>

            // <Button
            //   key={category}

            //   onClick={() => handleClick(category, index)}
            //   sx={{ m: 2 }}

            //   color={selected === category ? "primary" : "primary"}
            //   size={selected === category ? "large" : "small"}
            //   variant={selected === category ? "contained" : "text"}
            // > {category}
            // </Button>

            <Link key={category} to={category} activeClass="active" className='scroll' spy={true} smooth={true} offset={-380} duration={600} >
              {category}
            </Link>

          )}
        </Box>


        {types?.map((category) => {
          let currentCategory = books.filter(book => book.category === category)
          return (
            <Paper key={category} id={`${category}`} sx={{ mt: 35, mb: 35, ml: '30%', maxWidth: '50%' }}>

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