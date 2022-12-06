import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export const apiSlice = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  baseQuery,
  tagTypes: ['Note', 'User'],
  endpoints: builder => ({})
})