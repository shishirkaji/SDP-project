var mongoose = require("mongoose");
var passportlocalmongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, requied: true},
    roles: {
        role: {type: String, required: true},
        isAdmin: {type: Boolean, required: true}
    }
});

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", userSchema);