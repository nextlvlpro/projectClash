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

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Server address
const PORT = process.env.PORT || 5000;

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

// Initialize Socket.io with the HTTP server
initializeSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
