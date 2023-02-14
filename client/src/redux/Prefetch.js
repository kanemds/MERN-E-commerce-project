import { store } from '../app/store'
import { notesApiSlice } from '../pages/notes/notesApiSlice'
import { usersApiSlice } from '../pages/users/usersApiSlice'
import { booksApiSlice } from '../pages/books/booksApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'


// https://redux-toolkit.js.org/rtk-query/usage/prefetching

// The goal of prefetching is to make data fetch before the user navigates to a page or attempts to load some known content.

// There are a handful of situations that you may want to do this, but some very common use cases are:

// User hovers over a navigation element
// User hovers over a list element that is a link
// User hovers over a next pagination button
// User navigates to a page and you know that some components down the tree will require said data. This way, you can prevent fetching waterfalls.

const Prefetch = () => {
  useEffect(() => {
    // store.dispatch(api.util.prefetch('endpoint', arg: notesList(named it), options: {force:true}))  fetch again even though data exist
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
  }, [])
  return <Outlet />
}

export default Prefetch