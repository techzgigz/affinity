const mongoose = require("mongoose");

const key = mongoose.model(
  "Key",
  new mongoose.Schema({
    public: String,
    userid:String,
    private:String
  })
);

module.exports = key;
