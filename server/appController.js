var Crawler = require("./crawler.js");
var Promise = require("bluebird");

module.exports = {

  crawlPages: function(url) {

    return new Promise(function(resolve, reject){

      Crawler.checkSiteMapForUrl(url).then(function(exists){
        
        if(!exists) {
          
          Crawler.sendPageRequest(url).then(function(html){

            Promise.all([
              Crawler.getPageStaticAssets(html), Crawler.getPageLinks(html)
              ]).then(function(results){

                resolve(results);

              });

            // Crawler.getPageStaticAssets(html).then(function(staticAssets){
              
            //   resolve(staticAssets);

            // });
          
            // Promise.all([
            //   Crawler.getPageStaticAssets(html),
            //   Crawler.getPageLinks(html)
            // ]).then(function(results){

            //   // results[0] = static assets
            //   // results[1] = children links
            //   // {
            //   //   url: url,
            //   //   staticAssets: [a, b],
            //   //   childLinks: [a, b],
            //   //   depth: 1
            //   // }

            //   Crawler.addEntryToSiteMap(entry).then(function(children){
            //     if(children){
            //       // call this function recursively!
            //     }
            //   });
            // });
          });

        }

      });

      // Crawler.getSiteMap().then(function(sitemap){
      //   resolve(sitemap);
      // });

    });


  }

};
