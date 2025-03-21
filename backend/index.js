const express = require("express");
const cors = require("cors");
require("dotenv").config();  // To use environment variables

const app = express();
const port = process.env.PORT || 5000;  // Set port from environment variable or default to 5000

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse incoming JSON requests

// Example route
app.get("/test", (req, res) => {
  res.send("Welcome to Project Clash API!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
