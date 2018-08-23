//SET UP VARIABLE
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var publicDir = require('path').join(__dirname,'/assets');
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require("connect-flash");
//DEFINE MODEL
var User = require("./model/user");


//SET UP ROUTE
var main = require("./router/main/index");
var user = require('./router/user/user');


//SET UP NODE CONFIG
app.use(flash());
app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(user);
app.use(main);

//SET UP SESSION
app.use(session({
	secret: "SDP project env",
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 180*60*1000 }
}));

//SET UP PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//SET UP MLab
mongoose.connect('mongodb://joelNguyen1010:Hoilamcho1010@ds121332.mlab.com:21332/devbooking');
//SET UP GLOBAL

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	// res.locals.message = req.flash('error');
});


app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Welcome to our web Apllication");
});