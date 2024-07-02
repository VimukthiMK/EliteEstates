import { useContext, useEffect, useRef, useState } from "react"
import "./chat.scss"
import { AuthContext } from "src/context/AuthContext"
import apiRequest from "src/lib/apiReq"

import { format } from "timeago.js"
import NoAvatar from "src/assets/icon/no-avatar.svg"
import { FaTimes} from "react-icons/fa";

const Chat = () => {
  const [chat, setChat] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const [chats, setChats] = useState(null)

  const messageEndRef = useRef()

  useEffect(() => {
    loadChats()
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats,chat])

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
      setChat({ ...res.data, receiver })
    } catch (err) {
      console.log(err)
    }
  }


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
            <img src={c.receiver.avatar || <NoAvatar/>} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* Opended ChatBox */}
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || <NoAvatar/>} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
            <FaTimes style={{ color: 'black', fontSize: '20px' }} />
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
          <form className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Chat