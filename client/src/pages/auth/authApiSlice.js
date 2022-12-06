import { apiSlice } from "../../app/api/apiSlice"
import { logOut } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: credentials
      })
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      // instead useDispatch each into component, it can dispatch here as well
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // const { data } =  await queryFulfilled
          await queryFulfilled
          // console.log(data) from backend 'cookie cleared'
          dispatch(logOut())
          // immediately remove all existing cache entries, and all queries will be considered 'uninitialized'
          dispatch(apiSlice.util.resetApiState())
        } catch (error) {
          console.log(error)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      })
    })
  })
})

export const { useLoginMutation, useUserLogoutMutation, useRefreshMutation } = authApiSlice