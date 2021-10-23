const mongoose = require("mongoose");

const User = mongoose.model(
  "Userss",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    did:String,
    createAT:{
      type: Date,
      default: Date.now
    }
  })
);

module.exports = User;
