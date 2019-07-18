var db = require("../models");

module.exports = function (app) {
  // Get all from products
  app.get("/api/scrape", function (req, res) {
    axios.get("https://www.nytimes.com").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article").each(function (i, element) {

        var result = {};


        var title = $(element).children().text();
        var link = $(element).find("a").attr("href");

        results.push({
          title: title,
          link: link
        });

      });

      $(results).each(function (i, data) {
        db.scrapedData.insert(data);
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

  // Create a new product
  app.post("/api/project_2.products", function (req, res) {
    // eslint-disable-next-line camelcase
    db.project_2.products.create(req.body).then(function (dbproject_2) {
      // eslint-disable-next-line camelcase
      res.json(dbproject_2.products);
    });
  });

  // Delete a product by id
  app.delete("/api/project_2.products/:id", function (req, res) {
    db.project_2.products
      .destroy({ where: { id: req.params.id } })
      // eslint-disable-next-line camelcase
      .then(function (dbproject_2) {
        // eslint-disable-next-line camelcase
        res.json(dbproject_2.products);
      });
  });
};
