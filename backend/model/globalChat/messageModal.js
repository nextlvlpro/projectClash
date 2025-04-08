const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

  user: { type: String, required: true }, // User email or username
  name: { type: String, required: true }, // User name
  text: { type: String, required: true },
},
{ timestamps: { createdAt: "timestamp" } });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message
