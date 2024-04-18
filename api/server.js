import express from "express"
// import connectDB from "./dbConnection"
import dotenv from "dotenv"

import authRoute from "./routes/auth.route.js"

// Create express app
const app = express()

// dotenv config
dotenv.config()

//initialize the port-Enter a port
const port = process.env.PORT

/*db connection */

// Parse JSON bodies
app.use(express.json());

// API Routes
app.use("/api/auth", authRoute)

app.listen(port,()=>{
    console.log('Backend is Running on port',port)
})

