var express = require('express');
var router = express.Router({mergeParams: true});
var Sysadmin = require('../../model/user');
var passport = require("passport");


router.get('/user/login', function(req, res){
    // req.flash("success", "Login Baby");
    res.render('user/login.ejs');
});

router.post('/user/login', function(req, res){
    
});

router.get('/user/new', function(req, res){
    res.render('user/register.ejs');
});

router.post('/user', function(req, res){
   console.log(req.body.role); 
});

//THIS IS FOR CREATE USER (DONT TOUCH THIS);
// router.get('/sysadmin/register', function(req, res){
//     var newAdmin = new Sysadmin({
//         username: "12761767"
//     });
//     Sysadmin.register(newAdmin, "12761767", function(err, newAdmin){
//         if(err) {
//             console.log(err);
//         } else {
//             console.log(newAdmin);
//                             passport.authenticate("local")(req, res, function(){
//                   res.redirect('/');
//                 });
//         }
//     });
//   res.send('connect');
// });


module.exports = router;