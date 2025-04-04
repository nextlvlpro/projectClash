const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    playerApiKey: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Hash the password with a salt value of 10
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  // Replace the plain text password with the hashed one
  user.password = hash;
  next();
});

module.exports = User;
