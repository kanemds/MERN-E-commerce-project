import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Public from './pages/Public'
import DashBoard from './pages/DashBoard'
import UsersList from './pages/users/UsersList'
import NotesList from './pages/notes/NotesList'
import DashBoardLayout from './components/DashBoardLayout'
import EditUser from './pages/users/EditUser'
import NewUserForm from './pages/users/NewUserForm'
import EditNote from './pages/notes/EditNote'
import NewNote from './pages/notes/NewNote'
import Prefetch from './redux/Prefetch'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Public />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          {/* prevent default 60s unsubscribe */}
          <Route element={<Prefetch />}>
            <Route path='dash' element={<DashBoardLayout />}>

              <Route index element={<DashBoard />} />

              <Route path='users'>
                <Route index element={<UsersList />} />
                <Route path=':id' element={<EditUser />} />
                <Route path='new' element={<NewUserForm />} />
              </Route>

              <Route path='notes'>
                <Route index element={<NotesList />} />
                <Route path=':id' element={<EditNote />} />
                <Route path='new' element={<NewNote />} />
              </Route>

            </Route>
          </Route>
        </Route>
      </Routes>



    </BrowserRouter >
  )
}

export default App
