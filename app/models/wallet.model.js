const mongoose = require("mongoose");

const Wallet = mongoose.model(
  "Wallet",
  new mongoose.Schema({
    did: String,
    userid:String
  })
);

module.exports = Wallet;
