var app = app || {};

app.FormView = Marionette.ItemView.extend({

  template: _.template("<div class='form-group'>"+
        "<label for='input-url'>Please enter the URL you would like to crawl:</label>"+
        "<input type='text' class='form-control' id='input-url' placeholder='https://gocardless.com/'/>"+
      "</div>"),

  className: "form-url",

  tagName: "form",

  events: {
    "submit": "handleSubmit"
  },

  handleSubmit: function(event){
    
    event.preventDefault();
    var url = $("#input-url").val();
    var requestUrl = "api/pages?" + "url=" + url;

    // send get request to server for requested URL
    $.get('api/pages', {url: url}, function(results){
      
      console.log("got results from server!");

      var entries = JSON.parse(results);
      var entryModels = [];

      // convert results into array of objects 
      // for adding to collection
      for (var key in entries) {
        entries[key]["url"] = key;
        entryModels.push(entries[key]);
      }

      // if (app.siteMap.length > 0) {
      //   app.siteMap.reset(entryModels);
      // }

      app.siteMap.reset(entryModels);

      // clear out url in input field
      $("#input-url").val("");

      // title list of results with requested URL
      $("caption").html("<h2>Results from " + url + "</h2>");

    });

  }

});
