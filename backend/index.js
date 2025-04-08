// Required Packages
const express = require("express");
const http = require("http"); // Import HTTP
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/db");

// Required routes
const mainRouter = require("./routes/mainRouter");
const errorHandler = require("./utils/errorHandler");
const { initializeSocket } = require("./socket/socket");
const path = require("path");

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Server address
const PORT = process.env.PORT || 5000;
const LOCAL_IP = "0.0.0.0";


// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

// DB connection
connectDb();

// Routes
app.use("/api", mainRouter);

// Test Route
app.get("/test", (req, res) => {
  res.json({ message: `Server is fine and working on port ${PORT}` });
});

// Error handler
app.use(errorHandler);

// Serve React build files
const frontendBuildPath = path.join(__dirname, "react-dist");
app.use(express.static(frontendBuildPath));


// Handle all routes by serving index.html (for React Router support)
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
  // Catch-all route for React (must be after API routes)
 

// Initialize Socket.io with the HTTP server
initializeSocket(server);

process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err);
});

// Start the server
server.listen(PORT,LOCAL_IP, () => {
  console.log(`Server is running on port ${PORT}`);
});
