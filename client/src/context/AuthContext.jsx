import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

//Current User
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  )

// update user
  const updateUser = (data) => {
    setCurrentUser(data)
  }

// Set Current user when logged in or updates
  useEffect(() => {
    localStorage.setItem("user",  JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser,updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}