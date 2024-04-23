import { useState } from "react"
import MenuIcon from "src/assets/icon/burger-menu-icon.svg"
import AppLogo from "src/assets/logo/logo.svg"
import "src/components/navbar/navbar.scss"

const Navbar = ()=>{
  const [open, setOpen] = useState(false)

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src={AppLogo} alt="app-logo" />
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
          
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        <div className="menuIcon">
          <img
            src={MenuIcon}
            alt="hamburger"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar