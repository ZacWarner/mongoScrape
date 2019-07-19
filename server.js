/* eslint-disable prettier/prettier */
// require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger("dev"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);






// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes

// Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/loginRoutes")(app);


// If running a test, set syncOptions.force to true
// clearing the `testdb`


app.listen(PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});


module.exports = app;
