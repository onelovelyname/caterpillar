var app = app || {};

app.on("before:start", function() {

  this.siteMap = new app.SiteMap();

});

app.on("start", function() {

  this.controller = new app.Controller();
  this.router = new app.Router({controller: this.controller});
  Backbone.history.start();
  console.log("app started!");

});

app.start();
