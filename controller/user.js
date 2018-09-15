var userMiddleware = {};
const User = require("../model/user");
const Attendee = require("../model/attendees");
const Speaker = require("../model/speaker");
const Sysadmin = require("../model/sysadmin");
const passport = require("passport");
var { promisify } = require('util');

//ADD USER
userMiddleware.addUser = (req, res, next) => {
  var isAdmin = req.body.role === "sysadmin" ? true : false;
  var newUser = new User({
     username: req.body.username,
     roles: {
         role: req.user._id,
         isAdmin: isAdmin
     }
  });

  User.register(newUser, req.body.password, (err, user) => {
      if(err) {
          req.flash('error', err.message);
          return res.redirect('/user/new');
         
      } else {
          console.log("finish create account")
          next();
      }

  });
};


//CREATING USER AND ASSIGN THEIR ROLE
userMiddleware.createUser = (req, res, next) => {
    const name = (req.body.firstname + req.body.lastname);
    const email = req.body.username;
    const phone = req.body.phone;
    const userRole = req.body.role;

    if(userRole === "sysadmin") {
        createSysadmin(req, res, next);
    }
    else if(userRole === "organiser"){
        // var newOrganiser = promisify(createOrganiser);
        // newOrganiser()
    } else {
        var newSpeaker = promisify(createSpeaker);
        newSpeaker(name, phone, email)
        .then((speaker) => req.user = speaker)
        .catch((err) => {
            errorHandlingUser(err);
            return res.redirect("/user/new");      
        })
        .then(next());
    }
};


var createSysadmin = (req, res, next) => {
    var newSysadmin = new Sysadmin({
        name: req.body.firstname,
        phone: req.body.phone,
        email: req.body.username
    });
    
    newSysadmin.save((err, admin) => {
        if(err) {
            console.log(err);
            if(err.code === 11000) { req.flash("The email has already registed")}
            req.flash('error', err.message);
            return res.redirect("/user/new");
        } else {
            req.user = admin;
            next();
        }
    });
};

var createOrganiser = () => {
    
    
};

var createSpeaker = (name, phone, email, callback) => {
      var newSpeaker = new Speaker({
          name,
          phone,
          email
      });
      newSpeaker.save((err, speaker) => {
          callback(err, speaker);
      });
};

var errorHandlingUser = (err) => {
    switch(err) {
        case err.errors.email:
            req.flash('error', err.errors.email.message);
        case err.errors.name:
            req.flash('error', err.errors.name.message);
            break;
        default:
            req.flash('error', err.message);
    }
}

module.exports = userMiddleware;