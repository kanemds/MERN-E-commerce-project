import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"



const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})


//Returns a new entity state object like {ids: [], entities: {}}
const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNotes: builder.query({
      query: () => '/notes',
      validateStatus: (response, result) => {
        // need to added in !result.isError, by default always 200
        return response.status === 200 && !result.isError
      },
      //default 60s
      // keepUnusedDataFor: 5,
      transformResponse: responseData => {
        const loadedNotes = responseData.map(note => {
          // since our backend mongodb ._id
          note.id = note._id
          return note
        })
        return notesAdapter.setAll(initialState, loadedNotes)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'note', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'note', id }))
          ]
        } else return [{ type: 'note', id: 'LIST' }]
      }
    }),
    addNewNote: builder.mutation({
      query: newNoteData => ({
        url: '/notes',
        method: 'POST',
        body: newNoteData
      }),
      invalidatesTags: [
        { type: 'Note', id: 'LIST' }
      ]
    }),
    updateNote: builder.mutation({
      query: updateNoteData => ({
        url: '/notes',
        method: 'PATCH',
        body: updateNoteData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Note', id: arg.id }
      ]
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: '/notes',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Note', id: arg.id }
      ]
    })
  })
})

export const { useGetNotesQuery, useAddNewNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = notesApiSlice

// selector function without arg api.endpoints.getPosts.select({ page: 5 })
// then called as selector(state) or passed into useSelector(selector)
// altogether end up with api.endpoints.getPosts.select()(state)
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

const selectNotesData = createSelector(
  selectNotesResult,
  state => state.data // normalized state object with ids & entities
)

export const {
  selectAll: selectAllNotes, //  const users = useSelector(selectAllUsers) 
  selectById: selectNoteById, //  const currentUser = useSelector(state => selectUserById(state, id))
  selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)
// The Nullish Coalescing Operator
// returns the first argument if it is not nullish (null or undefined)


// exsample
// const store = configureStore({
//   reducer: {
//     books: booksReducer,
//   },
// })

// const simpleSelectors = booksAdapter.getSelectors()
// const globalizedSelectors = booksAdapter.getSelectors((state) => state.books)

// // Need to manually pass the correct entity state object in to this selector
// const bookIds = simpleSelectors.selectIds(store.getState().books)

// // This selector already knows how to find the books entity state
// const allBooks = globalizedSelectors.selectAll(store.getState())