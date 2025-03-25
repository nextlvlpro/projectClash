const express = require("express");
const cors = require("cors");
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes will go here

// Error handling middleware (should be last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});