import React from "react";
import { Socket } from "socket.io-client";
import { ChatMessage } from "../../types/ChatTypes";
import { toast } from "react-toastify";

export function setupSocketListners(
    socket: Socket,
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
) {

    //connectopn related events
    socket.on("connect", ()=> {
        console.log("✅ Connected to WebSocket:", socket.id);
    })
    socket.on("disconnect", () => {
        console.log("❌ Disconnected from WebSocket:", socket.id);
    });

    socket.io.on("reconnect", (attemptNumber) => {
        console.log(`🔄 Reconnected on attempt ${attemptNumber}:`, socket.id);
        toast.success(`🔄 Reconnected to Chat (Attempt ${attemptNumber})`);
      });
    
      socket.io.on("reconnect_attempt", (attemptNumber) => {
        console.log("🔁 Trying to reconnect... Attempt", attemptNumber);
        toast.warn(`🔁 Trying to reconnect... Attempt ${attemptNumber}`);
      });
    
      socket.io.on("reconnect_failed", () => {
        console.log("❌ Reconnection failed");
        toast.error("❌ Reconnection failed. Please refresh.");
      });
    
    //global chat related events
    socket.on("chatHistory", (history) => {
        setMessages(history)
    })
    socket.on("receiveMessage", (message) => {
        
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log("New message received:");
    })
}