import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const productAdapter = createEntityAdapter({})

const initialState = productAdapter.getInitialState()

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: '/products',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      transformResponse: responseData => {
        const loadedProducts = responseData.map(product => {
          product.id = product._id
          return product
        })
        return productAdapter.setAll(initialState, loadedProducts)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Product', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Product', id }))
          ]
        } else return [{ type: 'Product', id: 'LIST' }]
      }
    }),
    addNewProduct: builder.mutation({
      query: newProductData => ({
        url: '/products',
        method: 'POST',
        body: newProductData
      }),
      invalidatesTags: [
        { type: 'Product', id: 'LIST' }
      ]
    }),
    updateProduct: builder.mutation({
      query: updateProductData => ({
        url: '/products',
        method: 'PATCH',
        body: updateProductData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Product', id: arg.id }
      ]
    }),
    deleteProduct: builder.mutation({
      query: ({ cartId, productId }) => ({
        url: '/products',
        method: 'DELETE',
        body: { cartId, productId }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Product', id: arg.id }
      ]
    })
  })
})

export const { useGetProductsQuery, useAddNewProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApiSlice