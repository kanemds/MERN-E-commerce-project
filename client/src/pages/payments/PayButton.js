import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { grey, red, pink } from '@mui/material/colors'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

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

const PayButton = () => {

  const { username } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {

  }

  let content

  if (!username) return content = <CHECKOUT variant='contained' onClick={() => navigate('/login')}>CHECK OUT</CHECKOUT>

  content = <CHECKOUT variant='contained' onClick={handleCheckout}>CHECK OUT</CHECKOUT>

  return content
}

export default PayButton