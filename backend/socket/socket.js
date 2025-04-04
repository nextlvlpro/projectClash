const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

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

  io.on("connection", (socket) => {
    console.log(`⚡ User connected: ${socket.id}`);
    
    // Store user with email as ID
    socket.join(socket.userEmail);

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  console.log("✅ Socket.io initialized successfully!");
}

module.exports = { initializeSocket };
