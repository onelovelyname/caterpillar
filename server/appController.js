var Crawler = require("./crawler.js");
var Promise = require("bluebird");

module.exports = {

  crawlPages: function(url) {

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

                var pageLinks = results[2];

                console.log("pageLinks: ", pageLinks);

                Crawler.addEntryToSiteMap(entry);

                // context.crawlPages(pageLinks[0]).then(function(){
                //   resolve(Crawler.getSiteMap());
                // });

                Promise.all([
                  // context.crawlPages(pageLinks[0]),
                  context.crawlPages(pageLinks[2])
                  ]).then(function(){
                    resolve(Crawler.getSiteMap());
                  });

                  // Promise.all([
                  //   context.crawlPages(pageLinks[0]),
                  //   //context.crawlPages(pageLinks[1])
                  //   //context.crawlPages(pageLinks[3])
                  //   //context.crawlPages(pageLinks[2])
                  // ]).then(function(){
                  //   resolve(Crawler.getSiteMap());
                  // });

                  // Promise.all(
                  //   pageLinks.map(function(pageLink) {
                  //     return context.crawlPages(pageLink);
                  //   })
                  // ).then(function(){
                  //   resolve(Crawler.getSiteMap());
                  // }).catch(function(error) {
                  //   console.log("error in crawling pages: ", error);
                  //   reject(error);
                  // });

              });

          });

        } else {
          resolve();
        }

      });

    });


  }

};
