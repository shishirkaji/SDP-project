var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var publicDir = require('path').join(__dirname,'/assets');
var path = require('path');
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local');

app.use(session({
	secret: "SDP project env",
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 180*60*1000 }
}));

//SET UP PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//SET UP MLab
mongoose.connect('mongodb://joelNguyen1010:Hoilamcho1010@ds121332.mlab.com:21332/devbooking');

app.get("/", function(req, res){
    res.render("homepage/homepage.ejs");
});
//

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Welcome to our web Apllication");
});