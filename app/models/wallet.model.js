const mongoose = require("mongoose");

const Wallet = mongoose.model(
  "wallet",
  new mongoose.Schema({
    did: String,
    userid:String
  })
);

module.exports = Wallet;
