import { Server } from "socket.io"
import dotenv from "dotenv"
import http from "http"

// dotenv config
dotenv.config()

const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
})

let onlineUser = []

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId)
  if (!userExists) {
    onlineUser.push({ userId, socketId })
  }
}

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId)
}

// Server
io.on("connection", (socket) => {
  
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id)
    console.log(`User connected: ${userId}`)
  })

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId)
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data)
    } else {
      console.log(`User with ID ${receiverId} is not online.`)
    }
  })

  socket.on("disconnect", () => {
    removeUser(socket.id)
    console.log("A user disconnected")
  })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})
