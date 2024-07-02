import { Server } from "socket.io"
import dotenv from "dotenv"

// dotenv config
dotenv.config()

//Port
const PORT = process.env.PORT || 4000

const io = new Server({
    cors: {
        origin: process.env.CLIENT_URL,
    },
})

// Server
io.on("connection", (socket) => {
    // Send Message To Client
    socket.emit("Hello")

    // Recieve Messages
    socket.on("Howdy", (arg) => {
        removeUser(arg)
    })
})

io.listen(PORT)