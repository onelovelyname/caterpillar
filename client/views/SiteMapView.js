var app = app || {};

app.SiteMapView = Marionette.CompositeView.extend({

  template: _.template("<h3>Results</h3><section></section>"),

  collection: app.results,

  childView: app.SiteEntryView,

  childViewContainer: "section"

});
