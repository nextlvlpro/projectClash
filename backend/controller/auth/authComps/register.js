const bcrypt = require("bcryptjs");
const User = require("../../../model/auth/userModel");
const jwt = require("jsonwebtoken");

async function registerNewUser(req, res, next) {
    try {
        const { name, email, password, playerApiKey } = req.body;

        // **1️⃣ Validate input fields**
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // **2️⃣ Check if user already exists**
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // **3️⃣ Hash the password**
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // **4️⃣ Create new user**
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            playerApiKey,
        });

        await newUser.save(); // Save user to MongoDB
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // **5️⃣ Send success response**
        res.cookie("authToken", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "prod", 
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }).status(201).json({ message: "User registered successfully", user: { name: newUser.name, email: newUser.email, playerApiKey: newUser.playerApiKey } });

    } catch (error) {
        next(error); // Pass errors to error handler middleware
    }
}

module.exports = { registerNewUser };
