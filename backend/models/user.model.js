const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    googleId: String,
    image: {
      type: String,
      default: "default-account-image.png"
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    authorize: []
  })
);
module.exports = User;