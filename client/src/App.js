import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Register from './components/Register'
import Public from './pages/Public'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Public />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>



    </BrowserRouter >
  )
}

export default App
