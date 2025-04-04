const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../model/globalChat/messageModal");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.headers.cookie?.split("authToken=")[1]; // Extract token from cookie

    if (!token) return next(new Error("Authentication error: No token provided"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      socket.id = decoded.id; // Attach email to socket
      
      
      next();
    } catch (error) {
        console.log(error);
        
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`⚡ User connected: ${socket.id}`);

    const messages = await Message.find().sort({ timestamp: -1 }).limit(100);
    socket.emit("chatHistory", messages.reverse());



    socket.on("sendMessage", async ({ user, text }) => {
        const newMessage = new Message({ user, text });
        await newMessage.save();
        io.emit("receiveMessage", newMessage);

        // Keep only the last 100 messages in DB
        const messageCount = await Message.countDocuments();
        if (messageCount > 100) {
          const oldestMessage = await Message.findOne().sort({ timestamp: 1 });
          if (oldestMessage) {
            await Message.deleteOne({ _id: oldestMessage._id });
          }
        }
      });

    // Store user with email as ID
    socket.join(socket.id);

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  console.log("✅ Socket.io initialized successfully!");
}

module.exports = { initializeSocket };
