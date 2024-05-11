import { useState, useContext } from "react"
import { AuthContext } from "src/context/AuthContext"
import { Link } from "react-router-dom"
import "src/components/navbar/navbar.scss"

import MenuIcon from "src/assets/icon/burger-menu-icon.svg"
import AppLogo from "src/assets/logo/logo.svg"
import NoAvatar from "src/assets/icon/no-avatar.svg"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { currentUser } = useContext(AuthContext)

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
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || NoAvatar} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
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
          <a href="/profile">Profile</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar