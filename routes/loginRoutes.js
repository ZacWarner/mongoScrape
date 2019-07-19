var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var passport = require("../config/passport");


module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.get("/api/login/getuser/:user", function (req, res) {
    console.log("getuser start");
    console.log(req.body);
    db.Login.findOne({
      where: {
        username: req.params.user
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/login/signup", function (req, res) {
    console.log(req.body);
    console.log(db.User)
    db.User.create(req.body)
      .then(function () {
        // If saved successfully, send the the new User document to the client
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        // If an error occurs, send the error to the client
        console.log(err)
        res.status(401).json(err);
      });
  });



  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });





};
