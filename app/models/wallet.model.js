const mongoose = require("mongoose");

const Wallet = mongoose.model(
  "Wallet",
  new mongoose.Schema({
    document: String,
    userid:String
  })
);

module.exports = Wallet;
