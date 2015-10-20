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

    // remove old models from app.siteMap
    app.siteMap.reset();

    // set url to user input, and build request with query
    var url = $("#input-url").val();
    var requestUrl = "api/pages?" + "url=" + url;

    // clear out url in input field
    $("#input-url").val("");

    // create new xhr request, and setup event handler for "onreadystatechange" event
    // this will capture chunked data sent by server

    var xhr = new XMLHttpRequest();
    xhr.previousText = "";

    xhr.onreadystatechange = function() {
      var entryModels = [];

      try {

        if(xhr.readyState > 2) {
          var newResponse = xhr.responseText.substring(xhr.previousText.length);
          xhr.previousText = xhr.responseText;
          
          eval(newResponse);
          
          // title list of results with requested URL
          $("caption").html("<h2>Results from " + url + " (" + app.siteMap.length + ")</h2>");

        }
      } catch (error) {

        console.log("error receiving data chunks from server: ", error);
      
      }

    };

    xhr.open("GET", requestUrl, true);
    xhr.send("Making request to server...");

  }

});
