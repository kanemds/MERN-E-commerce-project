import { createEntityAdapter } from "@reduxjs/toolkit"
import { response } from "express"
import { apiSlice } from "../../app/api/apiSlice"

const paymentAdapter = createEntityAdapter({})

const initialState = paymentAdapter.getInitialState()

export const paymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPayments: builder.query({
      query: () => ({
        url: '/create-checkout-session',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      transformResponse: responseData => {
        const loadedPayments = responseData.map(payment => {
          payment.id = payment._id
          return payment
        })
        return paymentAdapter.setAll(initialState, loadedPayments)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Payment', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Payment', id }))
          ]
        } else return [{ type: 'Payment', id: 'LIST' }]
      }
    })
  })
})