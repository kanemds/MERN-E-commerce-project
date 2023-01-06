import { Button, Box, Typography, Modal } from '@mui/material'
import { styled } from '@mui/material/styles'
import { grey, red, pink } from '@mui/material/colors'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useAddNewPaymentMutation } from './paymentApiSlice'
import { useEffect } from 'react'
import { useGetBooksQuery } from '../books/booksApiSlice'
import LoadingMessage from '../../components/LoadingMessage'


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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const PayButton = ({ product }) => {


  const { username } = useAuth()
  const navigate = useNavigate()

  const [isEnough, setIsEnough] = useState(false)
  const [open, setOpen] = useState(false)

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


  // let productId = []
  // product.details.map(book => productId.push(book.bookId))

  // const { books } = useGetBooksQuery('booksList', {
  //   selectFromResult: ({ data }) => ({
  //     books: data?.ids.map(id => data?.entities[id])
  //   })
  // })



  // console.log(selectedBooks)
  let productInstock = []
  let notAvailible
  const currentProduct = product.details
  currentProduct.map(book => {
    productInstock.push({ id: book.bookId, isInStock: book.quantity <= entities[book.bookId].instocks, quantity: entities[book.bookId].instocks, title: entities[book.bookId].title })
    notAvailible = productInstock.filter(item => item.isInStock === false)
  })

  console.log(notAvailible)




  useEffect(() => {
    if (notAvailible.length >= 1) {
      setIsEnough(false)
    } else {
      setIsEnough(true)
    }
  }, [notAvailible, isBookSuccess])

  // when add data to stripe backend success go to stripe website
  useEffect(() => {
    if (isSuccess) {
      window.location.href = data.url
    }
  }, [isSuccess])

  const handleCheckout = () => {
    addNewPayment({ username, product })
  }

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const info = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Opps! Some items are not available, please review the changes.
        </Typography>
        {notAvailible.map(product =>
          <Typography key={product.id} id="modal-modal-description" sx={{ mt: 2 }}>
            "{product.title}" is currently {product.quantity >= 1 ? `${product.quantity} Left` : 'Out of Stock'}
          </Typography>
        )}
      </Box>
    </Modal>
  )


  let content

  if (isBookLoading) return content = <LoadingMessage />

  if (!username) return content = <CHECKOUT variant='contained' onClick={() => navigate('/login')}>CHECK OUT</CHECKOUT>

  if (!isEnough) return content = (
    <>
      {info}
      < CHECKOUT variant='contained' onClick={handleOpen} > CHECK OUT</CHECKOUT >
    </>
  )

  if (isEnough) return content = <CHECKOUT variant='contained' onClick={handleCheckout}>CHECK OUT</CHECKOUT>


  return content
}

export default PayButton