import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'
import { Typography } from '@mui/material'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import ScaleLoader from 'react-spinners/ScaleLoader'

const EditNote = () => {

  const { id } = useParams()

  // const users = useSelector(selectAllUsers)
  // const note = useSelector(state => selectNoteById(state, id))

  const { username, isManager, isAdmin } = useAuth()

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entiteis[id]
    })
  })

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    })
  })

  if (!note && !users?.length) return <ScaleLoader color='grey' />

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <Typography>Access Denied</Typography>
    }
  }


  const content = <EditNoteForm note={note} users={users} />

  return content
}

export default EditNote