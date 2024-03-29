import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

//Returns a new entity state object like {ids: [], entities: {}}
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        validateStatus: (response, result) => {
          // need to added in !result.isError, by default always 200
          return response.status === 200 && !result.isError
        }
      }),
      //default 60s
      // keepUnusedDataFor: 5,
      transformResponse: responseData => {
        const loadedUsers = responseData.map(user => {
          // since our backend mongodb ._id
          user.id = user._id
          return user
        })
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      //https://redux-toolkit.js.org/rtk-query/usage/automated-refetching
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'User', id }))
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      }
    }),
    addNewUser: builder.mutation({
      query: newUserData => ({
        url: '/users',
        method: 'POST',
        body: newUserData
      }),
      // after this mutation, the invalidatesTags data will be invalidate and this will cause re-fetch data
      invalidatesTags: [
        { type: 'User', id: 'LIST' }
      ]
    }),
    updateUser: builder.mutation({
      query: updateUserData => ({
        url: '/users',
        method: 'PATCH',
        body: updateUserData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    }),
    updateCustomer: builder.mutation({
      query: updateCustomerData => ({
        url: '/users/customer',
        method: 'PATCH',
        body: updateCustomerData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: '/users',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    })
  })
})


export const { useGetUsersQuery, useAddNewUserMutation, useUpdateUserMutation, useUpdateCustomerMutation, useDeleteUserMutation } = usersApiSlice

// selector function without arg api.endpoints.getPosts.select({ page: 5 })
// then called as selector(state) or passed into useSelector(selector)
// altogether end up with api.endpoints.getPosts.select()(state)
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()


const selectUsersData = createSelector(
  selectUsersResult,
  state => state.data // normalized state object with ids & entities
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
// The Nullish Coalescing Operator
// returns the first argument if it is not nullish (null or undefined)


// exsample
// const store = configureStore({
//   reducer: {
//     books: booksReducer,
//   },
// })

// const simpleSelectors = booksAdapter.getSelectors()
// const globalizedSelectors = booksAdapter.getSelectors((state) => state.books)

// // Need to manually pass the correct entity state object in to this selector
// const bookIds = simpleSelectors.selectIds(store.getState().books)

// // This selector already knows how to find the books entity state
// const allBooks = globalizedSelectors.selectAll(store.getState())