const express = require('express');
const registerRoute = express.Router();
jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

registerRoute.post("/", async (req, res) => {
    res.status(200).json({
        message: "Hello from /api/auth/register"
    });
})


module.exports = registerRoute