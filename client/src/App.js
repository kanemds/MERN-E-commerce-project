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
import PersistLogin from './pages/auth/PersistLogin'
import { ROLES } from './config/roles'
import RequireAuth from './pages/auth/RequireAuth'
import useTitle from './hooks/useTitle'
import BooksList from './pages/books/BooksList'
import { EditBook } from './pages/books/EditBook'
import NewBookForm from './pages/books/NewBookForm'
import BooksPrefetch from './redux/BooksPrefetch'
import Products from './pages/products/Products'
import Product from './pages/products/Product'
import './App.css'
import ShoppingCart from './pages/cart/ShoppingCart'
import PaymentSuccess from './pages/payments/PaymentSuccess'
import OrdersList from './pages/order/OrdersList'
import EditOrder from './pages/order/EditOrder'

function App() {

  useTitle('K Book Shop')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          {/* Public */}
          <Route element={<BooksPrefetch />}>
            <Route index element={<Public />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />



            {/* protected */}
            <Route element={<PersistLogin />}>

              <Route path='products' >
                <Route index element={<Products />} />
                <Route path=':id' element={<Product />} />
              </Route>



              <Route path='carts'>
                <Route index element={<ShoppingCart />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>

                <Route path='payment-success/:id' element={<PaymentSuccess />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Manager, ROLES.Admin]} />}>
                  {/* prevent default 60s unsubscribe */}
                  <Route element={<Prefetch />}>
                    <Route path='dash' element={<DashBoardLayout />}>

                      <Route index element={<DashBoard />} />
                      <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                        <Route path='books'>
                          <Route index element={<BooksList />} />
                          <Route path=':id' element={<EditBook />} />
                          <Route path='new' element={<NewBookForm />} />
                        </Route>

                        <Route path='users'>
                          <Route index element={<UsersList />} />
                          <Route path=':id' element={<EditUser />} />
                          <Route path='new' element={<NewUserForm />} />
                        </Route>

                        <Route path='orders'>
                          <Route index element={<OrdersList />} />
                          <Route path=':id' element={<EditOrder />} />
                        </Route>

                      </Route>


                      <Route path='notes'>
                        <Route index element={<NotesList />} />
                        <Route path=':id' element={<EditNote />} />
                        <Route path='new' element={<NewNote />} />
                      </Route>

                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
            {/* protected end */}

          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
