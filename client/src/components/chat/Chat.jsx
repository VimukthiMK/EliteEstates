// src/components/Chat.jsx
import { useContext, useEffect, useRef, useState } from "react"
import "./chat.scss"
import { AuthContext } from "src/context/AuthContext"
import { SocketContext } from "src/context/SocketContext"
import { NotificationContext } from "src/context/NotificationContext"
import apiRequest from "src/lib/apiReq"

import { format } from "timeago.js"
import NoAvatar from "src/assets/icon/no-avatar.svg"
import { FaTimes } from "react-icons/fa"

const Chat = () => {
  const [chat, setChat] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const [chats, setChats] = useState(null)
  const { socket } = useContext(SocketContext)
  const { decrease } = useContext(NotificationContext)

  const messageEndRef = useRef()

  useEffect(() => {
    loadChats()
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats, chat])

  const loadChats = async () => {
    try {
      const load = await apiRequest("/chats")
      setChats(load.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id)
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease()
      }
      setChat({ ...res.data, receiver })
    } catch (err) {
      console.log(err)
    }
  }

  // Send Message
  const handleMessageSend = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const text = formData.get("text")

    if (!text) return
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text })
      // Set the current chat with history
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }))
      e.target.reset()
      if (socket) {
        socket.emit("sendMessage", {
          receiverId: chat.receiver.id,
          data: res.data,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id)
      } catch (err) {
        console.log(err)
      }
    }

    if (chat && socket) {
      const handleMessage = (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }))
          read()
        }
      }

      socket.on("getMessage", handleMessage)

      return () => {
        socket.off("getMessage", handleMessage)
      }
    }
  }, [socket, chat])

  return (
    <div className="chat">
      {/* All Chats */}
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver.avatar || NoAvatar} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* Opened ChatBox */}
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || NoAvatar} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              <FaTimes style={{ color: "black", fontSize: "20px" }} />
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form className="bottom" onSubmit={handleMessageSend}>
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Chat
