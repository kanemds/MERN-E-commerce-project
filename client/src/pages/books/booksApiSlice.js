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
      transformResponse: responseData => {
        const loadedBooks = responseData.map(book => {
          book.id = book._id
          return book
        })
        return booksAdapter.setAll(initialState, loadedBooks)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
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
    }),
    updateBook: builder.mutation({
      query: updateBookData => ({
        url: '/books',
        method: 'PATCH',
        body: updateBookData
      }),
      invalidatesTags: (result, error, arg) => [{
        type: 'Book', id: arg.id
      }]
    }),
    updateStocks: builder.mutation({
      query: updateStocksData => ({
        url: '/books',
        method: 'PATCH',
        body: updateStocksData
      }),
      invalidatesTags: (result, error, arg) => [{
        type: 'Book', id: arg.id
      }]
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: '/books',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Book', id: arg.id }
      ]
    })
  })
})
export const { useGetBooksQuery, useAddNewBookMutation, useUpdateBookMutation, useUpdateStocksMutation, useDeleteBookMutation } = booksApiSlice

export const selectBooksResult = booksApiSlice.endpoints.getBooks.select()


const selectBooksData = createSelector(
  selectBooksResult,
  state => state.data // normalized state object with ids & entities
)

export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
  selectIds: selectBookIds
} = booksAdapter.getSelectors(state => selectBooksData(state) ?? initialState)