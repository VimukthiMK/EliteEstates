import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from "src/context/AuthContext.jsx"
import { SearchContextProvider } from "src/context/SearchContext.jsx"
import { SocketContextProvider } from "src/context/SocketContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchContextProvider>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </SearchContextProvider>
  </React.StrictMode>,
)
