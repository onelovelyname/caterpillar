// handle initial client request and structure modification of the DOM
$(function() {

  console.log("document is ready!");

  $("#form-url").submit(function(event){

    event.preventDefault();
    var url = $("#input-url").val();

    var requestUrl = "api/pages?" + "url=" + url;

    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", requestUrl, true);
    // xhr.onprogess = function() {
    //   console.log("in progress: ", xhr.responseText);
    // };
    // xhr.send();

    $.get('api/pages', {url: url}, function(results){
      
      console.log("results from server: ", results);

    });

  });

});
