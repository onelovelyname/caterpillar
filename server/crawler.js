var Promise = require("bluebird");
var request = require("request");
var cheerio = require("cheerio");

module.exports = (function() {

  var siteMap = {};
  var root = "";

  // function checks if siteMap already contains the requested URL
  // in order to prevent mapping of same URL multiple times (and endless looping)
  var checkSiteMapForUrl = function(url) {

    root = url;

    return new Promise(function(resolve, reject){

      var exists = false;

      for (var key in siteMap) {
        if (key === url) {
          exists = true;
        }
      }

      resolve(exists);

    });

  };

  var sendPageRequest = function(url) {

    return new Promise(function(resolve, reject) {

      request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {

          resolve(body);

        }
      });

    });

  };

  var getPageStaticAssets = function(html) {

    var staticAssets = {};

    return new Promise(function(resolve, reject) {

      $ = cheerio.load(html);

      var scripts = $("script"),
          links = $("link"),
          images = $("img");

      var assets = [scripts, links, images];

      for (var i = 0; i < assets.length; i++) {
        
        for (var key in assets[i]) {

          if (assets[i][key].attribs) {
            var type = assets[i][key].name;
            var srcUrl = assets[i][key].attribs.src || assets[i][key].attribs.href;
            
            if (!staticAssets[type] && srcUrl) {
              staticAssets[type] = [];
            }

            if (srcUrl) {
              staticAssets[type].push(srcUrl);
            }

          }

        }
        
      }

      resolve(staticAssets);

    });

  };

  var getPageLinks = function(html) {

    var pageLinks = [];
    var rootCopy = root.slice(0, root.length - 1);

    return new Promise(function(resolve, reject){

      $ = cheerio.load(html);

      var pageLinkResults = $("a");

      for (var key in pageLinkResults) {
        if (pageLinkResults[key].attribs) {
          if (pageLinkResults[key].attribs.href) {
            var fullPageLink = rootCopy + pageLinkResults[key].attribs.href;
            pageLinks.push(fullPageLink);
          }
        }
      }

      resolve(pageLinks);

    });

  };

  var addEntryToSiteMap = function() {

    return new Promise(function(resolve, reject){

    });

  };

  var getSiteMap = function() {

    return new Promise(function(resolve, reject){

      resolve(siteMap);

    });

  };


  return {

    sendPageRequest: sendPageRequest,
    getPageStaticAssets: getPageStaticAssets,
    getPageLinks: getPageLinks,
    addEntryToSiteMap: addEntryToSiteMap,
    checkSiteMapForUrl: checkSiteMapForUrl,
    getSiteMap: getSiteMap
  
  };
  
})();
