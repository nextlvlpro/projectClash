const Message = require("../model/globalChat/messageModal");
const { trimOldMessages } = require("./socketUtils");

async function handleSocketConnection(io, socket) {
  console.log(`⚡ User connected: ${socket.id}`);
    getConnectedUsers(io, socket);
  try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(100);
    socket.emit("chatHistory", messages.reverse());
  } catch (err) {
    console.error("❌ Error sending chat history:", err);
  }

  socket.on("sendMessage", async ({ user, text, name }) => {
    try {
      if (!user || !text?.trim()) return;

      const newMessage = new Message({ user, name, text: text.trim() });
      await newMessage.save();

      io.emit("receiveMessage", newMessage);

      await trimOldMessages(); // Optional: maintain only 100 messages
    } catch (err) {
      console.error("❌ Error handling sendMessage:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });

  socket.on("error", (err) => {
    console.error("❌ Socket error:", err);
  });
}

module.exports = { handleSocketConnection };


function getConnectedUsers(io, socket) {
  const connectedUsers = Array.from(io.sockets.sockets.values()).map((s) => s.id);
 
}