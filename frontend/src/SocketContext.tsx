import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { baseAddress } from "../config";
import { useUser } from "./UserContext";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser(); // Get logged-in user
  const [socket, setSocket] = useState<Socket | null>(null);

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
  

  return (
    <SocketContext.Provider value={{ socket }}>
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
