import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Public from './pages/Public'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Public />} />
          <Route path='login' element={<Login />} />

        </Route>
      </Routes>



    </BrowserRouter >
  )
}

export default App
