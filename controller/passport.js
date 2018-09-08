var passport = require("passport");
var passportMiddleware = {}

passportMiddleware.authenticate = (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
      if(err){
          req.flash('error', err.message);
          return res.redirect('/user/login');
      } if(!user) {
          req.flash("error", "Username or password is incorrect");
          return res.redirect("/user/login");
      } 
      req.logIn(user, (err) => {
          if(err){
              req.flash('error', err.message);
                return res.redirect('/user/login');
          }
          next();
      });
  })(req,res,next);
};

module.exports = passportMiddleware;