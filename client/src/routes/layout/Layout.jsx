import "src/routes/layout/layout.scss"
import Navbar from "src/components/navbar/Navbar"
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router-dom"

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

const RequireAuth = ()=>{

}

export { Layout, RequireAuth }