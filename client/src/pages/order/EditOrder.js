import React from 'react'
import { useParams } from 'react-router-dom'
import LoadingMessage from '../../components/LoadingMessage'
import useAuth from '../../hooks/useAuth'
import EditOrderForm from './EditOrderForm'
import { useGetOrdersQuery } from './ordersApiSlice'

const EditOrder = () => {

  const { id } = useParams()
  const { isAdmin, isManager } = useAuth()

  const { order } = useGetOrdersQuery('ordersList', {
    selectFromResult: ({ data }) => ({
      order: data?.entities[id]
    })
  })



  if (!order) return <LoadingMessage />


  return <EditOrderForm order={order} />

}

export default EditOrder