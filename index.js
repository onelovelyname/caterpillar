var express = require("express");
var appController = require("./server/appController.js");
var port = process.env.PORT || 3000;

var app = express();

app.listen(port);

app.get("/api/pages", function(req, res) {
 
  var url = req.query.url;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.connection.setTimeout(0);

  appController.crawlPages(url, req, res).then(function(sitemap){
    res.end();
    //res.send(sitemap);
  });

});

app.use(express.static(__dirname + '/client'));
