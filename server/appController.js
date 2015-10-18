var Crawler = require("./crawler.js");
var Promise = require("bluebird");

module.exports = {

  crawlPages: function(url, req, res) {

    // if it is the first time running crawlPages,
    // reset siteMap to empty object (to avoid storing past results)
    // if (!Crawler.getRootUrl()) {
    //   console.log("calling resetSiteMap");
    //   Crawler.resetSiteMap();
    // }

    var context = this;

    return new Promise(function(resolve, reject){

      Crawler.checkSiteMapForUrl(url).then(function(isValid){
        
        console.log(url, isValid);

        if (isValid) {
          
          Crawler.sendPageRequest(url).then(function(html){

            if (html) {

              Promise.all([
                  Crawler.getCurrentUrl(),
                  Crawler.getPageStaticAssets(html),
                  Crawler.getPageLinks(html)
              ]).then(function(results){

                // Promise.all callback returns ordered results, 
                // corresponding to array of function calls passed as Promise.all arguments
                if (results) {

                  var entry = {
                    currentUrl: results[0],
                    staticAssets: results[1]
                  };

                  var pageLinks = results[2];

                  var testPageLinks = pageLinks.slice(0,5);

                  Crawler.addEntryToSiteMap(entry);

                  //var responseText = JSON.stringify(entry) + "/n";
                  res.write(JSON.stringify(entry));

                  // call crawlPages on variable number of page links in synchronous order
                  // synchronicity is important because siteMap is updated on each call
                  Promise.reduce(testPageLinks, function(total, pageLink){
                    return context.crawlPages(pageLink, req, res).then(function(){
                    });
                  }).then(function(){
                    var siteMap = Crawler.getSiteMap();
                    
                    // reset rootUrl so that future calls to crawlPages
                    // can reset siteMap
                    // Crawler.resetRootUrl();
                    // console.log("rootUrl reset");
                    
                    resolve();
                    //resolve(JSON.stringify(siteMap));
                  });
                  
                } else {
                  resolve();
                }

              });

            } else {
              resolve();
            }

          });

        } else {
          resolve();
        }

      });

    });


  }

};
