var Promise = require("bluebird");
var request = require("request");
var cheerio = require("cheerio");

module.exports = (function() {

  var siteMap = {};
  var root;
  var currentUrl;

  // function checks if siteMap already contains the requested URL
  // in order to prevent mapping of same URL multiple times (and endless looping)
  var checkSiteMapForUrl = function(url) {

    url = url.toString();
    // set root as the URL passed in by the user
    // this will only be set once, the first time this function is called
    if (!root) {
  
      if (url[url.length - 1] === "/") {
        root = url.slice(0, url.length - 1);
      } else {
        root = url;
      }
      
    }

    currentUrl = url;

    return new Promise(function(resolve, reject){
    
      // if the site already exists in the SiteMap
      // if the site is not on the root URL's domain
      // the site is not valid, and should not be run
      if (url.substring(0, root.length) !== root || siteMap[url]) {
        resolve(false);

      }

      resolve(true);

    });

  };

  var sendPageRequest = function(url) {

    return new Promise(function(resolve, reject) {

      request(url, function(error, response, body) {

        if (!error && response.statusCode === 200) {
          console.log("body in sendPageRequest: ", body);
          resolve(body);

        } else {
          resolve();
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
    //var rootCopy = root.slice(0, root.length - 1);

    return new Promise(function(resolve, reject){

      $ = cheerio.load(html);

      var pageLinkResults = $("a");

      for (var key in pageLinkResults) {
        if (pageLinkResults[key].attribs) {
          var href = pageLinkResults[key].attribs.href;
          if (href) {
            if (href.slice(0,4) === "http") {
              pageLinks.push(href);
            } else if (href.slice(0,1) === "/" || href.slice(0,1) === "#") {
              pageLinks.push(root + href);
            }
          }
        }
      }

      resolve(pageLinks);

    });

  };

  var addEntryToSiteMap = function(entry) {

    siteMap[entry.currentUrl] = entry.staticAssets;

  };

  var getSiteMap = function() {

    return siteMap;

  };

  var getRootUrl = function() {

    return root;

  };

  var getCurrentUrl = function() {

    return currentUrl;

  };

  return {

    sendPageRequest: sendPageRequest,
    getPageStaticAssets: getPageStaticAssets,
    getPageLinks: getPageLinks,
    addEntryToSiteMap: addEntryToSiteMap,
    checkSiteMapForUrl: checkSiteMapForUrl,
    getSiteMap: getSiteMap,
    getRootUrl: getRootUrl,
    getCurrentUrl: getCurrentUrl
  
  };
  
})();
