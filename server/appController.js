var Crawler = require("./crawler.js");
var Promise = require("bluebird");

module.exports = {

  crawlPages: function(url) {

    var context = this;

    return new Promise(function(resolve, reject){

      Crawler.checkSiteMapForUrl(url).then(function(isValid){
        
        if(isValid) {
          
          Crawler.sendPageRequest(url).then(function(html){

            Promise.all([
                Crawler.getCurrentUrl(),
                Crawler.getPageStaticAssets(html),
                Crawler.getPageLinks(html)
              ]).then(function(results){

                var entry = {
                  rootUrl: results[0],
                  staticAssets: results[1]
                };

                var pageLinks = results[2];

                Crawler.addEntryToSiteMap(entry).then(function(siteMap){

                  console.log(siteMap);

                  Promise.all(
                    pageLinks.map(function(pageLink) {
                      return context.crawlPages(pageLink);
                    })
                  ).then(function(){
                    resolve(Crawler.getSiteMap());
                  });
                  
                });


              });

          });

        }

      });

    });


  }

};
