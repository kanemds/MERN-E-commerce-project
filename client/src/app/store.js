import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import authReducer from "../pages/auth/authSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

setupListeners(store.dispatch)
// A utility used to enable refetchOnFocus and refetchOnReconnect behaviors
// const {
//   data: users,
//   isLoading,
//   isSuccess,
//   isError,
//   error
// } = useGetUsersQuery(undefined, //or null
//   {
//     pollingInterval: 60000, // every min rerender
//     refetchOnFocus: true, // different window and come back also refetch
//     refetchOnMountOrArgChange: true // Will always refetch when a new subscriber to a query is added
//   })
