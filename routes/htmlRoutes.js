/* eslint-disable prettier/prettier */
var db = require("../models");
var axios = require("axios");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    let you = req.user;
    db.Article.find({})
      .then(function (dbArticle) {
        let hbsObj = {
          user: req.user,
          article: dbArticle
        };
        console.log(req.user);
        console.log(hbsObj.article)
        // If we were able to successfully find Articles, send them back to the client
        res.render("index", { hbsObj: hbsObj });
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });

  });

  app.get("/signup", function (req, res) {
    let hbsObj = {
      user: req.user,

    };

    res.render("signup", { hbsObj: hbsObj });
  })

  app.get("/login", function (req, res) {
    let hbsObj = {
      user: req.user,

    };

    res.render("login", { hbsObj: hbsObj });
  })
};
