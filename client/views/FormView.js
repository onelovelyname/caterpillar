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
    console.log("event heard!");
    event.preventDefault();
    var url = $("#input-url").val();
    var requestUrl = "api/pages?" + "url=" + url;

    $.get('api/pages', {url: url}, function(results){
      
      var entries = JSON.parse(results);
      var entryModels = [];

      for (var key in entries) {
        entries[key]["url"] = key;
        entryModels.push(entries[key]);
      }

      app.siteMap.add(entryModels);

      console.log("siteMap: ", app.siteMap);

    });

  }

});
