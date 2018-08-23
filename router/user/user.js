var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require("passport");
var userMiddleware = require('../../middleware/user');
//LOGIN
router.get('/user/login', (req, res) => {
    res.render('user/login.ejs');

});
router.post("/user/login", function(req, res, next){
  passport.authenticate('local', function(err, user, info){
      if(err){
          return next(err);
      } if(!user) {
          req.flash("error", "Username or password is incorrect.");
          return res.redirect("/user/login");
      } console.log("will be login");
      req.logIn(user, function(err){
          if(err){return next(err);}
          res.redirect("/");
      });
  })(req,res,next);
  
});


//LOG OUT
router.get("/logout", (req,res) => {
  req.logout();
  res.redirect("/");
});

//REGISTER
router.get('/user/new', (req, res) => {
    res.render('user/register.ejs');
});

router.post('/user', userMiddleware.addUser, (req, res) => {
    passport.authenticate("local")(req, res, () => {
        res.redirect('/user/login');
    });
});


module.exports = router;
