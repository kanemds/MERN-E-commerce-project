import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'
import { Typography } from '@mui/material'

const EditNote = () => {

  const { id } = useParams()

  const users = useSelector(selectAllUsers)

  const note = useSelector(state => selectNoteById(state, id))

  const content = note && users ? <EditNoteForm note={note} users={users} /> :
    <Typography>Loading...</Typography>

  return content
}

export default EditNote