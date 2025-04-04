const express = require('express');
const  registerRoute = require('./registerRoute');
const authRouter = express.Router();

authRouter.use("/register", registerRoute)

module.exports = authRouter;