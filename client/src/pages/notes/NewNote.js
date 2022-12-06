import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

const NewNote = () => {

  const users = useSelector(selectAllUsers)

  if (!users?.length) return <Typography>Not Currently Available</Typography>

  const content = <NewNoteForm users={users} />

  return content
}

export default NewNote