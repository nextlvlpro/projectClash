const express = require('express');
const { loginUser, verifyUser, logoutUser } = require('../../controller/auth/authComps/login');
const loginRoute = express.Router();

loginRoute.post("/", async (req, res, next) => {
    loginUser(req,res,next)
})

loginRoute.get("/verify", verifyUser, async (req, res) => {
    res.status(200).json({
        message: "User verified",
        user: req.user,
    });
})

loginRoute.post("/logout", (req, res) => {
    logoutUser(req,res)
})


module.exports = loginRoute
