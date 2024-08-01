import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import App from "./App.jsx"
import ThemeProvider from "./features/Theme/ThemeProvider.jsx"
import { store, persistor } from "./services/store/store.js"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
