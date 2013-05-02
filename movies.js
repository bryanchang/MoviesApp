$(document).ready(function(){
  $('.btn').on('click', function(event){
    event.preventDefault();
    $.ajax({
      url: 'http://www.omdbapi.com/?s=True',
      method: 'get',
      dataType: 'json',
      success: function(movie){
        console.log(movie);
      }
      // error: function(){
      //   $('.error').slideDown();
      //   setTimeout(function(){$('.error').slideUp();}, 3000);
      // }
    });
  });

});