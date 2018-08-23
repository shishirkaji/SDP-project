var userMiddleware = {};
var User = require("../model/user");
userMiddleware.addUser = (req, res, next) => {
  var isAdmin = req.body.role === "sysadmin" ? true : false;
  var newUser = new User({
     username: req.body.username,
     roles: {
         role: req.body.role,
         isAdmin: isAdmin
     }
  });

  User.register(newUser, req.body.password, (err, user) => {
      if(err) {
          req.flash('error', err.message);
          return res.redirect('/user/new');
         
      } else {
          next();
      }

  });
};

module.exports = userMiddleware;