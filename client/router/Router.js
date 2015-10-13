var app = app || {};

app.Router = Marionette.AppRouter.extend({

  initialize: function() {
    console.log("Router initialized!");
  },

  appRoutes: {
    '': 'home'
  }

});
