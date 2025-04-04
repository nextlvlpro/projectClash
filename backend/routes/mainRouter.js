const express = require('express');
const cocApiRouter = require('./cocApiRoute/cocApiRouter');
const authRouter = require('./auth/authRouter');

const mainRouter = express.Router(); // Correct way to define the router

// Test base route
mainRouter.get("/base", (req, res) => {
    res.json({
        message: "Hello from /api/base"
    });
});

// Add CoC API router
mainRouter.use("/coc", cocApiRouter);

//auth routes
mainRouter.use("/auth", authRouter)
module.exports = mainRouter;
