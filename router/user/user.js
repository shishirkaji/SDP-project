var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require("passport");
var userController = require('../../controller/user');
var passportController = require("../../controller/passport");
var Attendee = require("../../model/attendees");
//LOGIN
router.get('/user/login', (req, res) => {
    res.render('user/login.ejs');

});
router.post("/user/login", passportController.authenticate ,(req, res, next) => {
    res.redirect('/');
});


//LOG OUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/user/login");
});

//ADD USER
router.get('/user/new', (req, res) => {
    res.render('user/new.ejs');
});

router.post('/user', userController.createUser, userController.addUser, (req, res) => {
    passport.authenticate("local")(req, res, () => {
        req.flash('success', "new account has been created");
         return res.redirect('/user/login');
    });
});

//TESTING
router.get('/test', (req, res) => {
    var newAttendee = new Attendee({
    name:"Jel",
       phone: 123456789,
       email: "nguyennnngocahnnn590@gmail.com"
    });
    
    newAttendee.save((err, user) =>{
        if(err) {
            if(err.code === 11000) { req.flash("The email has already registed")}
            var error = [err.errors.phone.message, err.errors.name.message, err.message];
      
            req.flash()
            console.log(error);
        } else{
            console.log(user);
        }
    });
});
module.exports = router;
