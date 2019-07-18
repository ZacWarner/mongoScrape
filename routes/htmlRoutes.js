/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    let you = req.user;

    res.render("index", { user: you });
  });
};
