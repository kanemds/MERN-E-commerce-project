import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import ScaleLoader from 'react-spinners/ScaleLoader'


const NewNote = () => {

  // const users = useSelector(selectAllUsers)

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    })
  })


  if (!users?.length) return <ScaleLoader color='grey' />

  const content = <NewNoteForm users={users} />

  return content
}

export default NewNote