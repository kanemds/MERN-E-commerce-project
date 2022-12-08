import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials }
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
          const { data } = await queryFulfilled
          console.log(data) //from backend 'cookie cleared'
          dispatch(logOut())
          // immediately remove all existing cache entries, and all queries will be considered 'uninitialized'
          setTimeout(() => { // take time to uninitialized all state, without it cause keep rerender which one of state still maintain
            dispatch(apiSlice.util.resetApiState())
          }, 1000)

        } catch (error) {
          console.log(error)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (error) {
          console.log(error)
        }
      }
    })

  })
})

export const { useLoginMutation, useUserLogoutMutation, useRefreshMutation } = authApiSlice