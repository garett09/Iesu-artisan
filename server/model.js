const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    feedBack1: String,
    feedBack2: String,
    feedBack3: String,
});

const UserDB = mongoose.model("userdb",schema);

module.exports = UserDB;