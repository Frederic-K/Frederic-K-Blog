import { createSlice } from "@reduxjs/toolkit"

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      state.push({
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || "success",
      })
    },
    removeToast: (state, action) => {
      return state.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const { addToast, removeToast } = toastSlice.actions
export default toastSlice.reducer
