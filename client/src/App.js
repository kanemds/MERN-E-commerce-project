import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './pages/Public'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Public />} />

        </Route>
      </Routes>

    </BrowserRouter >
  )
}

export default App
