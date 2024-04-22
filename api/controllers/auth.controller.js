
import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"

// Register User
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

// Login User
export const login = async (req, res) => {
  const { username, password } = req.body

  try {

    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" })

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" })

    // Generate Cookie token and Send to user

    const age = 1000 * 60 * 60 * 12  //Session Expiration - 12 Hours

    
    res
      .cookie("token", "myval", {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json("success")
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to login!" })
  }

}

// Logout
export const logout = (req, res) => {

}