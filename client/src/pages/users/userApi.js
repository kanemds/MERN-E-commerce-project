import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { response } from "express"
import { apiSlice } from "../../app/api/apiSlice"

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      validateStatus: (response, result) => {
        // need to added in !result.isError, by default always 200
        return response.status === 200 && !result.isError
      },
      //default 60s
      keepUnusedDataFor: 5,
      transformResponse: responseData => {
        const loadedUsers = responseData.map(user => {
          user.id = user._id
          return user
        })
        return userAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'List' },
            ...result.ids.map(id => ({ type: 'User', id }))
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      }
    })
  })
})

export const { useGetUsersQuery } = usersApiSlice