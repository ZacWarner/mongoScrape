/* eslint-disable prettier/prettier */
var db = require("../models");
var passport = require("../config/passport");
const sgMail = require('@sendgrid/mail');

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
  app.post("/api/signup", function (req, res) {
    db.Login.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.put("/api/login/passwordreset/newToken/:id", function (req, res) {
    console.log("put token start");
    console.log(req.body);
    db.Login.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function (dbpost) {
        res.json(dbpost);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });
  // Send email to seller
  app.post("/api/login/sendemail", function (req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
      to: req.body.to,
      from: "Agora@agora.com",
      subject: "A link to reset your password",
      text: req.body.message,
      html: "<strong>Click the link to reset your password!</strong><br><a href='" + req.body.message + "'>Reset Password</a>",
    };
    sgMail.send(message);
    res.json("Email Sent to " + req.body.to);
  });



};
