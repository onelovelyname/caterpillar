# Introduction to caterpillar
Caterpillar is a simple web crawler that performs the following activities:
1. Crawls all pages within a single domain
2. Creates a site map, showing which static assets each page depends on

## Technologies used
Node.js, Express, Bluebird (Promise library), Cheerio (DOM parser, alternative to JS-DOM) Backbone.js, Marionette.js

## Instructions for running caterpillar
1. run bower install and npm install to make sure you have the required dependencies

## Design Decisions and Challenges
1. The biggest design decision for this web crawler was NOT to use PhantomJS on the client-side for parsing. 
  - An advantage to PhantomJS is the robustness of results - using Phantom would have enabled me to get static assets listed in the CSS and JS files, as well as all of the assets declared in the HTML pages. 
  - However, this robustness would likely have been offset by being less performant. Blogs I read stated that average time to crawl one webpage could be >1 second, perhaps even more. 

2. Running a variable number of asynchronous recursive calls to appController.crawlPages()
  - I needed to use Promise.reduce() as seen on line 39 in appController.js to call crawlPages on each pageLink in order, one after the other. Each invocation of crawlPages depended upon having an updated siteMap to check (to see if a pageLink had already been crawled). Running multiple crawlPages() at the same time was causing synchroncity issues.  

3. Server automatically timed out after 2 minutes
  - This was a problem when sites took longer than 2 minutes to parse completely. For about 300 pages, the time to parse is around 2.5 minutes. 
  - To deal with this problem, I set the server connection to never timeout on line 13 in index.js.

