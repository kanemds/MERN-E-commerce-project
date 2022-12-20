import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const customerAdapter = createEntityAdapter({})

const initialState = customerAdapter.getInitialState()

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCustomers: builder.query({
      query: () => ({
        url: '/customers',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      transformResponse: responseData => {
        const loadedCustomers = responseData.map(customer => {
          customer.id = customer._id
          return customer
        })
        return customerAdapter.setAll(initialState, loadedCustomers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Customer', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Customer', id }))
          ]
        } else return [{ type: 'Customer', id: 'LIST' }]
      }
    }),
    addNewCustomer: builder.mutation({
      query: newCustomerData => ({
        url: '/customers',
        method: 'POST',
        body: newCustomerData
      }),
      invalidatesTags: [
        { type: 'Customer', id: 'LIST' }
      ]
    })
  })
})

export const { useGetCustomersQuery, useAddNewCustomerMutation } = customersApiSlice