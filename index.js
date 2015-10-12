var express = require("express");
var appController = require("./server/appController.js");
var port = process.env.PORT || 3000;

var app = express();

app.listen(port);

app.get("/api/pages", function(req, res) {
  
  var url = req.query.url;

  appController.crawlPages(url).then(function(sitemap){
    res.send(sitemap);
  });

});

app.use(express.static(__dirname + '/client'));
