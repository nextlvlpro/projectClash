import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../SocketContext";
import { useUser } from "../../UserContext"
import LoginRequired from "../../utils/LoginRequired";

export default function GlobalChat() {


  const { user, userVerified } = useUser()
  const { messages, sendMessage } = useSocket();
  const [newMessage, setNewMessage] = useState("");
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };



  if (!user) {
    return (
      <div>
        <LoginRequired />
      </div>
    )
  }
  if (user && userVerified) {
    return (
      <div className="max-w-lg mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
        <div
          ref={chatWindowRef}
          className="h-80 overflow-y-auto p-2 bg-gray-900 rounded-md"
        >
          {messages.map((msg, index) => (
            <div key={index} className="p-2">
              <span className="text-primary font-bold">{msg.user}: </span>
              <span className="text-text">{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="flex mt-4">
          <input
            type="text"
            className="flex-1 p-2 rounded-l-md bg-gray-700 text-white border-none outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-accent px-4 rounded-r-md text-white"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    )
  }
}

