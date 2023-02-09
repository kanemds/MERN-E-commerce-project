import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUsersQuery } from '../users/usersApiSlice'
import LoadingMessage from '../../components/LoadingMessage'
import EditCustomerForm from './EditCustomerForm'


const EditCustomer = () => {

  const { id } = useParams()

  const { currentUser } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      currentUser: data?.entities[id]
    })
  })

  if (!currentUser) return <LoadingMessage />

  const content = <EditCustomerForm currentUser={currentUser} />

  return content
}

export default EditCustomer