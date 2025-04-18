import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./UserContext";
import { setupSocketListners } from "./utils/socketHandlers/socletHandlers";
import { ChatMessage } from "./types/ChatTypes";

interface SocketContextType {
  socket: Socket | null;
  messages: {
     user: string; text: string , name: string, timestamp: string
}[];
  sendMessage: (text: string) => void;
}



const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const backendAddress = "http://192.168.31.53:5000";
  const { user, userVerified } = useUser(); // Get logged-in user
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!user) return;
  
   const newSocket = io(backendAddress,{
    withCredentials: true,
    transports: ["websocket"],
    reconnection: true, // ✅ allow reconnection
    reconnectionAttempts: 5, // ✅ try up to 5 times
    reconnectionDelay: 1000, // ✅ wait 1 second before trying again
   })
   setSocket(newSocket);

   setupSocketListners(newSocket, setMessages);

   return () => {
    newSocket.disconnect();
    console.log("🔌 Socket Disconnected");
  };
  }, [user, userVerified]);

  const sendMessage = (text: string) => {
    if (socket && user) {
      
      socket.emit("sendMessage", { user: user.email, name:user.name, text });
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
