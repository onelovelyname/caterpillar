// handle initial client request and structure modification of the DOM
$(function() {

  console.log("document is ready!");

  $("#form-url").submit(function(event){

    event.preventDefault();
    var url = $("#input-url").val();

    $.get('api/pages', {url: url}, function(results){
      console.log("results from server: ", results);
    });

  });

});
