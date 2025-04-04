import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { baseAddress } from "../config";
import { useUser } from "./UserContext";

interface SocketContextType {
  socket: Socket | null;
  messages: { user: string; text: string }[];
  sendMessage: (text: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser(); // Get logged-in user
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);

  useEffect(() => {
    if (!user) return;
  
    const newSocket = io(baseAddress, {
      withCredentials: true,
      transports: ["websocket"], // Ensure WebSocket is used
    });
  
    setSocket(newSocket);
  
    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", newSocket.id);
    });
    
    newSocket.on("chatHistory", (history) => setMessages(history));
    newSocket.on("receiveMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket Connection Error:", err.message);
    });
  
    newSocket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from Socket.io:", reason);
    });
  
    return () => {
      newSocket.disconnect();
      console.log("🔌 Socket Disconnected");
    };
  }, [user]);

  const sendMessage = (text: string) => {
    if (socket && user) {
      socket.emit("sendMessage", { user: user.email, text });
    }
}
  

  return (
    <SocketContext.Provider value={{ socket, messages, sendMessage  }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
