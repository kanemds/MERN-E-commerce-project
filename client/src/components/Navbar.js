import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Toolbar, Typography, Button, Link, IconButton, Badge } from '@mui/material/'
import { pink, blue, orange, red } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
// icons
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import DescriptionIcon from '@mui/icons-material/Description'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PaidIcon from '@mui/icons-material/Paid'
import SettingsIcon from '@material-ui/icons/Settings'
//
import LoadingMessage from './LoadingMessage'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { useUserLogoutMutation } from '../pages/auth/authApiSlice'
import { useGetProductsQuery } from '../pages/products/productApiSlice'
import { useGetOrdersQuery } from '../pages/order/ordersApiSlice'
import useAuth from '../hooks/useAuth'
import Grid from '@mui/material/Unstable_Grid2'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../pages/auth/authSlice'

// \/ means /
// ^ match the start of the string
// $ match the end of the string
// match between 0 and 1 of the preceding token


const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const BOOKS_REGEX = /^\/dash\/books(\/)?$/
const ORDERS_REGEX = /^\/dash\/orders(\/)?$/


const ColorBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "white",
    backgroundColor: pink[500]
  }
}))

const WhiteColor = styled(SettingsIcon)(({ theme }) => ({
  color: 'white'
}))

const Gap = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const SmallButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: 0,
    height: 0
  }
}))




const Navbar = () => {

  const { userId, status, username, isEmployee, isManager, isAdmin } = useAuth()

  console.log(status)
  const token = useSelector(selectCurrentToken)


  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [cartId, setCartId] = useState(localStorage.getItem('BookShopCartId') || null)
  const [isReady, setIsReady] = useState(false)
  const [exist, setExist] = useState(userId || null)

  const {
    data: products,
    isSuccess: isProductsSuccess
  } = useGetProductsQuery()


  useEffect(() => {
    if (isProductsSuccess) {
      setCartId(localStorage.getItem('BookShopCartId'))
    }
  }, [products])

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true)
    }, 1000)
  }, [])


  const { product } = useGetProductsQuery('productsList', {
    selectFromResult: ({ data }) => ({
      product: data?.entities[cartId]
    })
  })



  const { order } = useGetOrdersQuery('ordersList', {
    selectFromResult: ({ data }) => ({
      order: data?.entities[product?.paymentId]
    })
  })

  useEffect(() => {
    if (order?.payment_status === 'paid') {
      setCartId(null)
    }
  }, [order])



  const quantity = product ? product?.totalcounts : 0

  const [userLogut, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUserLogoutMutation()

  useEffect(() => {
    if (isSuccess) {
      window.location.reload()
      navigate('/')
    }
  }, [isSuccess, navigate])



  const toNewNote = () => navigate('/dash/notes/new')
  const toNotes = () => navigate('/dash/notes')

  const toNewUser = () => navigate('/dash/users/new')
  const toUsers = () => navigate('/dash/users')

  const toNewBook = () => navigate('/dash/books/new')
  const toBooks = () => navigate('/dash/books')

  const toOrders = () => navigate('/dash/orders')

  let newNoteButton = null
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <IconButton aria-label="New Note" onClick={toNewNote} >
        <NoteAddIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }

  let newUserButton = null
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <IconButton aria-label="New User" onClick={toNewUser} >
        <PersonAddIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }

  let newBookButton = null
  if (BOOKS_REGEX.test(pathname)) {
    newBookButton = (
      <IconButton aria-label="New Book" onClick={toNewBook} >
        <BookmarkAddIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }


  let usersButton = null
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      usersButton = (
        <IconButton aria-label="All Users" onClick={toUsers} >
          <PeopleAltIcon sx={{ color: 'white' }} />
        </IconButton>
      )
    }
  }

  let notesButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <IconButton aria-label="All Notes" onClick={toNotes} >
        <DescriptionIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }

  let booksButton = null
  if (!BOOKS_REGEX.test(pathname) && pathname.includes('/dash')) {
    booksButton = (
      <IconButton aria-label="All Books" onClick={toBooks} >
        <BookmarksIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }

  let ordersButton = null
  if (!ORDERS_REGEX.test(pathname) && pathname.includes('/dash')) {
    ordersButton = (
      <IconButton aria-label="All Orders" onClick={toOrders} >
        <PaidIcon sx={{ color: 'white' }} />
      </IconButton>
    )
  }



  if (isError) return <Typography>{error.data?.message}</Typography>

  let buttonContent
  if (isLoading) {
    return <LoadingMessage />
  } else {
    buttonContent = (
      <>
        {/* {newNoteButton}
        {notesButton} */}
        {ordersButton}
        {newUserButton}
        {usersButton}
        {newBookButton}
        {booksButton}
      </>
    )
  }

  let content

  if (!isReady) content = ''

  if (isReady && isEmployee || isReady && isManager || isReady && isAdmin) {
    content = (
      <Box >
        <SmallButton color="inherit" onClick={() => navigate('/dash')}> Dash Board</SmallButton>
        {buttonContent}
        <IconButton onClick={() => navigate('/carts')} sx={{ mr: 2 }}>
          <ColorBadge badgeContent={quantity}>
            <ShoppingCartIcon sx={{ color: 'white' }} />
          </ColorBadge>
        </IconButton>
        <SmallButton color="inherit" onClick={() => userLogut()}>Logout</SmallButton>
      </Box>
    )
  }

  if (isReady && status === 'Customer') {
    content = (
      <Box>
        <IconButton onClick={() => navigate(`/user/${userId}`)}>
          <WhiteColor />
        </IconButton>
        <IconButton onClick={() => navigate('/carts')}>
          <ColorBadge badgeContent={quantity}>
            <ShoppingCartIcon sx={{ color: 'white' }} />
          </ColorBadge>
        </IconButton>
        <SmallButton color="inherit" onClick={() => userLogut()}>Logout</SmallButton>
      </Box>
    )
  }

  if (isReady && !userId) {
    content = (
      <Box >
        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
        <IconButton onClick={() => navigate('/carts')}>
          <ColorBadge badgeContent={quantity}>
            <ShoppingCartIcon sx={{ color: 'white' }} />
          </ColorBadge>
        </IconButton>
      </Box>
    )
  }



  return (

    // <AppBar position="fixed" sx={{ height: '80px', width: '100%', zindex: 9999, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
    <AppBar position="fixed" sx={{ height: '80px', width: '100%', zindex: 9999 }}>

      <Grid container sx={{ flexGrow: 1, ml: 3, mr: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Gap xs={12} sm={12} md={5} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography variant="h6" >
            <Link to='/' component={RouterLink} underline='none' color='white' sx={{ mr: 3 }}>K Book Shop</Link>
            |
            <Link to='/about' component={RouterLink} underline='none' color='white' sx={{ ml: 3 }}>About this App</Link>
          </Typography>
        </Gap>
        <Gap xs={12} sm={12} md={7} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

          {content}


        </Gap>
      </Grid>

    </AppBar >


  )
}


export default Navbar