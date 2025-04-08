const { Server } = require("socket.io");
const { socketAuth } = require("./socketAuth");
const { handleSocketConnection } = require("./socketHandler");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingInterval: 10000, // client pings every 10s
    pingTimeout: 5000,   // server waits 5s for pong

  });

  io.use(socketAuth); // Apply auth middleware

  io.on("connection", (socket) => {
    handleSocketConnection(io, socket);
  });

  io.engine.on("connection_error", (err) => {
    console.error("❌ Global socket connection error:", err.message);
  });

  console.log("✅ Socket.io initialized successfully!");
}

module.exports = { initializeSocket };
