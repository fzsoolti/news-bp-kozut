const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  sub: {
    type: String,
    required: [true, "sub megadása kötelező!"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Felhasználónév megadása kötelező!"],
  },
  email: {
    type: String,
    required: [true, "Email cím megadása kötelező!"],
    validate: [validator.isEmail, 'Érvénytelen email cím!'],
    unique: true,
  },
  pictureURL: {
    type: String,
    required: [true, "Kép megadása kötelező!"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
