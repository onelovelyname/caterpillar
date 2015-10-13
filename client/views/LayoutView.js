var app = app || {};

app.LayoutView = Marionette.LayoutView.extend({

  tagName: 'section',

  template: _.template("<section id='form-region'></section>"+
    "<section id='results-region'></section>"+
    "<section id='info-region'></section>"),

  regions: {
    'form': '#form-region',
    'results': '#results-region',
    'info': '#info-region'
  }

});
