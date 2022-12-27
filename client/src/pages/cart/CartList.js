import React from 'react'
import { useGetProductsQuery } from '../products/productApiSlice'

const CartList = ({ productId }) => {

  console.log(productId)

  const { carts } = useGetProductsQuery('cartsList', {
    selectFromResult: ({ data }) => ({
      carts: data?.ids.map(id => data?.entities[productId])
    })
  })

  console.log(carts)


  return (
    <div>CartList</div>
  )
}

export default CartList