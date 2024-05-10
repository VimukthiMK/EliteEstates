import { ToastContainer } from 'react-toastify'
import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "src/context/AuthContext"

import "src/routes/layout/layout.scss"
import Navbar from "src/components/navbar/Navbar"

// General
const Layout = () => {
  return (
    <div className="layout">
      {/* Toast Notifications */}
      <ToastContainer/>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

// Protected
const RequireAuth = ()=>{
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        {/* Toast Notifications */}
        <ToastContainer/>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }

}

export { Layout, RequireAuth }