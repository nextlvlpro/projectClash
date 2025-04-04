// required Packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const connectDb = require('./db/db');


//required routes
const mainRouter = require('./routes/mainRouter');
const errorHandler = require('./utils/errorHandler');


//server addrress
const PORT = process.env.PORT || 5000;

//cookie parser
app.use(cookieParser());
app.use(express.json());


//cors 
app.use (cors({
    credentials: true,
    origin: true
}))

// db connection
connectDb();

//routes
app.use("/api", mainRouter);

//test Route 
app.get("/test", (req, res) => {
    res.json({message: `Server is fine and working on port ${PORT}`})
})



// error handler
app.use(errorHandler);

// server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
