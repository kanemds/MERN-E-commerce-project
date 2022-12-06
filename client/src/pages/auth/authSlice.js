import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      // under auth reducer === state.auth.token
      console.log('aaa', accessToken)
      state.token = accessToken
    },
    logOut: (state, action) => {
      state.token = null
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = state => state.auth.token