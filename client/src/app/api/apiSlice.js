import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../pages/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log('arge', args)
  console.log('api', api)


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