var Crawler = require("./crawler.js");
var Promise = require("bluebird");

module.exports = {

  crawlPages: function(url) {

    var context = this;

    return new Promise(function(resolve, reject){

      Crawler.checkSiteMapForUrl(url).then(function(exists){
        
        if(!exists) {
          
          Crawler.sendPageRequest(url).then(function(html){

            Promise.all([
                Crawler.getRootUrl(),
                Crawler.getPageStaticAssets(html),
                Crawler.getPageLinks(html)
              ]).then(function(results){

                var entry = {
                  rootUrl: results[0],
                  staticAssets: results[1]
                };

                var pageLinks = results[2];

                Crawler.addEntryToSiteMap(entry).then(function(){

                  // console.log("pageLinks: ", pageLinks);

                  for (var i = 0; i < pageLinks.length; i++) {

                    context.crawlPages(pageLinks[i]);

                  }
                  
                });


              });

          });

        }

      });

      resolve(Crawler.getSiteMap());

    });


  }

};
