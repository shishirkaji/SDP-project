var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require("passport");
var userMiddleware = require('../../middleware/user');
var passportMiddleware = require("../../middleware/passport");
//LOGIN
router.get('/user/login', (req, res) => {
    res.render('user/login.ejs');

});
router.post("/user/login", passportMiddleware.authenticate ,(req, res, next) => {
    res.redirect('/');
});


//LOG OUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/user/login");
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
