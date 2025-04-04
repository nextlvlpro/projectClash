const bcrypt = require("bcryptjs");
const User = require("../../../model/auth/userModel");
const jwt = require('jsonwebtoken');
async function loginUser (req,res,next) {
    
        try {
            const { email, password } = req.body;
    
            // **1️⃣ Validate input fields**
            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            // **2️⃣ Check if user exists**
            
            const user = await User.findOne( {email});
            console.log(email);
            
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials: Email" });
            }
            // **3️⃣ Compare passwords**
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials: Password" });
            }
    
            // **4️⃣ Generate JWT token**
            const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            // **5️⃣ Send success response with token and user data**
            res.cookie("authToken", token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === "prod", 
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            }).status(200).json({
                message: "Login successful",
                user: { name: user.name, email: user.email, playerApiKey: user.playerApiKey },
            });
    
        } catch (error) {
            next(error); // Pass errors to error handler middleware
        }
    

}

function verifyUser (req,res,next) {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        User.findOne({ email: decoded.id })
            .then((user) => {
                req.user = { name: user.name, email: user.email, playerApiKey: user.playerApiKey };
                next();
            })
            .catch((err) => {
                next(err);
            });
    });
} 

function logoutUser (req,res,next) {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logged out" });
}


module.exports = {loginUser, verifyUser, logoutUser}