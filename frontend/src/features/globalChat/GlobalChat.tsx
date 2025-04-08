import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../SocketContext";
import { useUser } from "../../UserContext";
import LoginRequired from "../../utils/LoginRequired";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";

export default function GlobalChat() {
  const { user } = useUser();
  const { messages, sendMessage } = useSocket();
  const [newMessage, setNewMessage] = useState("");
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  if (!user) return <LoginRequired />;

  return (
    <div className="chatContainer bg-background text-text flex flex-col h-[93dvh] overflow-hidden">
      {/* Scrollable Chat Window */}

      <div className="h-[85dvh] overflow-y-auto flex flex-col gap-4 p-4" ref={chatWindowRef}>
      {messages.map((message, i) => {
          const isOwnMessage = user.email === message.user;
          const formattedDate = new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className={`w-full flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`messageBox text-white p-2 rounded-2xl min-w-72 w-fit max-w-[80%] flex flex-col gap-1 border
                ${isOwnMessage ? "bg-secondary" : "bg-blue-600"}`}
              >
                <span className="text-sm font-semibold">{message.name}</span>
                <span className="text-base break-words">{message.text}</span>
                <span className="text-xs text-gray-400">{formattedDate}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

    

      {/* Fixed Input Box */}
      <div className="w-full border-t bg-background px-4 py-3 flex gap-2 items-center">
        <Input
          type="text"
          placeholder="Type your message..."
          className="flex-1"
          size="md"
          value={newMessage}
          variant="filled"
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          className="bg-primary text-background rounded-lg px-4 py-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
