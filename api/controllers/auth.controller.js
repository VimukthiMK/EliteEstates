
import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"

export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        
        // create the user and Save
        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        })
        res.status(201).json({ message: "User created successfully" })
      } catch (err) {
        res.status(500).json({ message: "Failed to create user!" })
      }
}

export const login = async (req, res) => {
  
}

export const logout = (req, res) => {

}