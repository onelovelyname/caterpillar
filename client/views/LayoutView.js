var app = app || {};

app.LayoutView = Marionette.LayoutView.extend({

  tagName: 'section',

  template: _.template("<section id='form-region'></section>"+
    "<section class='table-responsive' id='results-region'></section>"),

  regions: {
    'form': '#form-region',
    'results': '#results-region',
    'info': '#info-region'
  }

});
