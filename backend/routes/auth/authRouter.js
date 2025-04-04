const express = require('express');
const  registerRoute = require('./registerRoute');
const loginRoute = require('./loginRoute');
const authRouter = express.Router();

authRouter.use("/register", registerRoute)
authRouter.use("/login", loginRoute)
authRouter.use("/logout", loginRoute)

module.exports = authRouter;