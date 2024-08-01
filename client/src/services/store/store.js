// Redux
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import themeReducer from "../slices/themeSlice"
import toastReducer from "../slices/toastSlice"
import { postApi } from "../slices/postApi" // Import the postApi
// Redux persite
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [postApi.reducerPath], // Exclude postApi from persistence
}

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  toast: toastReducer,
  [postApi.reducerPath]: postApi.reducer, // Add postApi reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      postApi.middleware,
    ), // Add postApi middleware
})

export const persistor = persistStore(store)
