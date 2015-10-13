var app = app || {};

app.SiteEntry = Backbone.Model.extend({

  defaults: {
    url: "https://gocardless.com/",
    img: [],
    script: [],
    link: []
  }

});
