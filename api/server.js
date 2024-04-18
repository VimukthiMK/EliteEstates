import express from "express"
import connectDB from "./dbConnection"
import dotenv from "dotenv"

// Create express app
const app = express()

// dotenv config
dotenv.config()

//initialize the port-Enter a port
const port = process.env.PORT

/*db connection '*/
connectDB()

app.listen(port,()=>{
    console.log('Backend is Running on port',port)
})

// API Routes
