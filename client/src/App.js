import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Public from './pages/Public'
import DashBoard from './pages/DashBoard'
import UserList from './pages/users/UserList'
import NoteList from './pages/notes/NoteList'
import DashBoardLayout from './components/DashBoardLayout'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Public />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='dash' element={<DashBoardLayout />}>

            <Route index element={<DashBoard />} />

            <Route path='users'>
              <Route index element={<UserList />} />
            </Route>

            <Route path='notes'>
              <Route index element={<NoteList />} />
            </Route>

          </Route>
        </Route>
      </Routes>



    </BrowserRouter >
  )
}

export default App
