var userMiddleware = {};
var User = require("../model/user");
userMiddleware.addUser = (username, password, role) => {
    var newUser = new User({
       username,
       role: {
           role
       }
    });
};

module.exports = userMiddleware;