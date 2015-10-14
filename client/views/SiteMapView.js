var app = app || {};

app.SiteMapView = Marionette.CompositeView.extend({

  tagName: "table",

  className: "table table-hover",

  template: _.template("<thead><tr><th class='col-url'>URL</th><th class='col-img'>Images</th><th class='col-link'>Links</th><th class='col-script'>Scripts</th></tr></thead><tbody></tbody>"),

  childView: app.SiteEntryView,

  childViewContainer: "tbody"

});
