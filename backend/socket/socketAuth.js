const jwt = require("jsonwebtoken");


function socketAuth(socket, next) {
    try {
        const token = socket.handshake.headers.cookie?.split("authToken=")[1];
        if (!token) return next(new Error("Authentication error: No token"));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.id = decoded.id;
        next();
    } catch (error) {
        console.error("❌ Socket auth error:", err.message);
        return next(new Error("Authentication error"));
    }
}

module.exports = { socketAuth };