var app = app || {};

app.SiteEntryView = Marionette.ItemView.extend({

  template: _.template("<td class='col-url'><%= url %></td><td class='col-img'><%= getImages() %></td><td class='col-link'><%= getLinks() %></td><td class='col-script'><%= getScripts() %></td>"),

  tagName: "tr",

  templateHelpers: function() {

    var model = this.model;

    return {

      url: model.get("url"),

      getImages: function() {
        var images = model.get("img");
        var imageList = "";
        for (var i =0; i < images.length; i++){
          imageList += "<li>" + images[i] + "</li>";
        }

        return "<ul>" + imageList + "</ul>";
      },

      getLinks: function() {
        var links = model.get("link");
        var linkList = "";
        for (var i =0; i < links.length; i++){
          linkList += "<li>" + links[i] + "</li>";
        }

        return "<ul>" + linkList + "</ul>";
      },

      getScripts: function() {
        var scripts = model.get("script");
        var scriptList = "";
        for (var i =0; i < scripts.length; i++){
          scriptList += "<li>" + scripts[i] + "</li>";
        }

        return "<ul>" + scriptList + "</ul>";
      }

    };

  }

});
