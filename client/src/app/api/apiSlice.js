import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../pages/auth/authSlice'

// https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://k-book-backend.onrender.com',
  // baseUrl: 'http://localhost:3002',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {

    const token = getState().auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    } else if (!token) {
      console.log('no token found')
    }
    return headers
  }
})

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
const baseQueryWithReauth = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    console.log('Sending refresh token')

    const refreshToken = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshToken?.data) {
      api.dispatch(setCredentials({ ...refreshToken.data }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshToken?.error?.status === 403) {
        refreshToken.error.data.message = 'Login has expired. '
      }
      return refreshToken
    }
  }
  return result
}

export const apiSlice = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Note', 'User', 'Book', 'Cart', 'Payment', 'Order'],
  endpoints: builder => ({})
})