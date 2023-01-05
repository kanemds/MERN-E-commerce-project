import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { grey, red, pink } from '@mui/material/colors'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useAddNewPaymentMutation } from './paymentApiSlice'
import { useEffect } from 'react'
import { useGetBooksQuery } from '../books/booksApiSlice'
import { createReducer, current } from '@reduxjs/toolkit'

const CHECKOUT = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500
  ]),
  backgroundColor: pink[500],
  '&:hover': {
    backgroundColor: pink[600
    ],
    border: '1px #d81b60 solid'
  },
  border: '1px #e91e63 solid',
}))

const PayButton = ({ product }) => {


  const { username } = useAuth()
  const navigate = useNavigate()

  const [addNewPayment, {
    data,
    isSuccess,
    isLoading,
    isError,
    error
  }] = useAddNewPaymentMutation()


  const {
    data: books,
    isLoading: isBookLoading,
    isSuccess: isBookSuccess,
    isError: isBookError,
    error: bookError
  } = useGetBooksQuery('booksList', {
    pollingInterval: 15 * 60 * 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const { ids, entities } = books


  const currentProduct = product.details

  console.log(currentProduct)

  // let productId = []
  // product.details.map(book => productId.push(book.bookId))

  // const { books } = useGetBooksQuery('booksList', {
  //   selectFromResult: ({ data }) => ({
  //     books: data?.ids.map(id => data?.entities[id])
  //   })
  // })

  // const selectedBooks = books.filter(book => productId.indexOf(book._id) !== -1)

  // console.log(selectedBooks)
  let currentProductInstock = []
  const dif = currentProduct.map(book => {
    currentProductInstock.push({ id: book.bookId, isInStock: book.quantity <= entities[book.bookId].instocks })
  })

  console.log(currentProductInstock)

  if (currentProductInstock === true) console.log('true')
  if (currentProductInstock === false) console.log('false')

  // when add data to stripe backend success go to stripe website
  useEffect(() => {
    if (isSuccess) {
      window.location.href = data.url
    }
  }, [isSuccess])

  const handleCheckout = () => {
    addNewPayment({ username, product })
  }

  let content

  if (!username) return content = <CHECKOUT variant='contained' onClick={() => navigate('/login')}>CHECK OUT</CHECKOUT>

  content = <CHECKOUT variant='contained' onClick={handleCheckout}>CHECK OUT</CHECKOUT>

  return content
}

export default PayButton