import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from "src/context/AuthContext.jsx"
import { SearchContextProvider } from "src/context/SearchContext.jsx"
import { SocketContextProvider } from "src/context/SocketContext.jsx"
import { NotificationContextProvider } from 'src/context/NotificationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchContextProvider>
      <AuthContextProvider>
        <NotificationContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </NotificationContextProvider>
      </AuthContextProvider>
    </SearchContextProvider>
  </React.StrictMode>,
)
