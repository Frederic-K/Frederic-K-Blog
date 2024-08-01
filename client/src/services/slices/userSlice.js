import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload
    },
    clearUser: (state) => {
      state.currentUser = null
    },
  },
})

export const { signInSuccess, updateSuccess, clearUser } = userSlice.actions

export default userSlice.reducer
