const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.wallet = require("./wallet.model");
db.key = require("./key.model");
module.exports = db;