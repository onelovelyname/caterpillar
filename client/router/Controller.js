var app = app || {};

app.Controller = Marionette.Object.extend({

  initialize: function() {
    app.LayoutViewInstance = new app.LayoutView();
    app.getRegion('appRegion').show(app.LayoutViewInstance);
  },

  home: function() {
    app.LayoutViewInstance.getRegion('form').show(new app.FormView());
    app.LayoutViewInstance.getRegion('results').show(new app.SiteMapView());
  }

});
