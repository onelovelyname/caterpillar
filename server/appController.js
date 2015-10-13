var Crawler = require("./crawler.js");
var Promise = require("bluebird");

module.exports = {

  crawlPages: function(url, req, res) {

    var context = this;

    return new Promise(function(resolve, reject){

      Crawler.checkSiteMapForUrl(url).then(function(isValid){
        
        console.log(url, isValid);

        if(isValid) {
          
          Crawler.sendPageRequest(url).then(function(html){

            Promise.all([
                Crawler.getCurrentUrl(),
                Crawler.getPageStaticAssets(html),
                Crawler.getPageLinks(html)
              ]).then(function(results){

                var entry = {
                  currentUrl: results[0],
                  staticAssets: results[1]
                };

                //res.write(JSON.stringify(entry));

                var pageLinks = results[2];

                var testPageLinks = pageLinks.slice(0,10);

                Crawler.addEntryToSiteMap(entry);

                Promise.reduce(testPageLinks, function(total, pageLink){
                  return context.crawlPages(pageLink, req, res).then(function(){
                  });
                }).then(function(){
                  var siteMap = Crawler.getSiteMap();
                  console.log("siteMap: ", siteMap);
                  resolve(JSON.stringify(siteMap));
                });
              });

          });

        } else {
          resolve();
        }

      });

    });


  }

};
