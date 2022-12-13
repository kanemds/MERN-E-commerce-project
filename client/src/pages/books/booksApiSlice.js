import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const booksAdapter = createEntityAdapter({})

const initialState = booksAdapter.getInitialState()

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      transformErrorResponse: responseData => {
        const loadedBooks = responseData.map(book => {
          book.id = book._id
          return book
        })
        return booksAdapter.setAll(initialState, loadedBooks)
      },
      providesTags: (result, error, arg) => {
        if (result?.id) {
          return [
            { type: 'Book', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Book', id }))
          ]
        } else return [{ type: 'Book', id: 'LIST' }]
      }
    }),
    addNewBook: builder.mutation({
      query: newBookData => ({
        url: '/books',
        method: 'POST',
        body: newBookData
      }),
      invalidatesTages: [
        { type: 'Book', id: 'LIST' }
      ]
    })
  })
})
export const { useAddNewBookMutation } = booksApiSlice