import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useGetBooksQuery } from './books/booksApiSlice'
import LoadingMessage from '../components/LoadingMessage'
import FrontPageDisplay from '../components/FrontPageDisplay'
import { CATEGORY } from '../config/category'
import { Link } from 'react-scroll'



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
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 20 }} >

        <Box position="fixed" sx={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
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

        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          {types?.map((category) => {
            let currentCategory = books.filter(book => book.category === category)
            return (
              <Paper key={category} id={`${category}`} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '40%', m: 25 }}>

                <FrontPageDisplay currentCategory={currentCategory} />
              </Paper>
            )
          }
          )}
        </Box>

      </Box >
    )
  }

  return content
}

export default Public