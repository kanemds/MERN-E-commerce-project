import { store } from '../app/store'
import { booksApiSlice } from '../pages/books/booksApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'


const BooksPrefetch = () => {
  useEffect(() => {

    store.dispatch(booksApiSlice.util.prefetch('getBooks', 'booksList', { force: true }))

  }, [])
  return <Outlet />
}

export default BooksPrefetch