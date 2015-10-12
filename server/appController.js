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

                // console.log("entry: ", entry);

                var pageLinks = results[2];

                Crawler.addEntryToSiteMap(entry).then(function(siteMap){

                  resolve(siteMap);

                  // context.crawlPages(pageLinks[2]);
                  // context.crawlPages(pageLinks[1]);
                  // context.crawlPages(pageLinks[2]);

                  //resolve(siteMap);

                  // Promise.all(
                  //   pageLinks.map(function(pageLink) {
                  //     return context.crawlPages(pageLink);
                  //   })
                  // ).then(function(){
                  //   resolve(Crawler.getSiteMap());
                  // });
                  
                });


              });

          });

        }

      });

    });


  }

};
