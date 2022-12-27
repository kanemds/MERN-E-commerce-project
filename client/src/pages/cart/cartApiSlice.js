import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"
import { selectBooksResult } from "../books/booksApiSlice"

const cartAdapter = createEntityAdapter({})

const initialState = cartAdapter.getInitialState()

export const cartsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCarts: builder.query({
      query: () => ({
        url: '/carts',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      transformResponse: responseData => {
        const loadedCarts = responseData.map(cart => {
          cart.id = cart._id
          return cart
        })
        return cartAdapter.setAll(initialState, loadedCarts)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Cart', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Cart', id }))
          ]
        } else return [{ type: 'Cart', id: 'LIST' }]
      }
    }),
    addNewCart: builder.mutation({
      query: newCartData => ({
        url: '/carts',
        method: 'POST',
        body: newCartData
      }),
      invalidatesTags: [
        { type: 'Cart', id: 'LIST' }
      ]
    })
  })
})

export const { useGetCartsQuery, useAddNewCartMutation } = cartsApiSlice

export const selectCartsResult = cartsApiSlice.endpoints.getCarts.select()

const selectCartsData = createSelector(
  selectBooksResult,
  state => state.data
)

export const {
  selectById: selectCartById,
} = cartAdapter.getSelectors(state => selectCartsData(state) ?? initialState)