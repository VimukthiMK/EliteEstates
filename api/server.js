import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import authRoute from "./routes/auth.route.js"
import postRoute from "./routes/post.route.js"
import userRoute from "./routes/user.route.js"

// Create express app
const app = express()

// dotenv config
dotenv.config()

//initialize the port-Enter a port
const port = process.env.PORT

// Parse JSON bodies
app.use(express.json())

//Cookie Parser
app.use(cookieParser())

// CORS Origin Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// API Routes
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/users", userRoute)

app.listen(port,()=>{
    console.log('Backend is Running on port',port)
})

