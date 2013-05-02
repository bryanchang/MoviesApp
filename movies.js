function errorSlidingDown(){
  $('.error').slideDown();
  setTimeout(function(){$('.error').slideUp()}, 2500);
}

function showMovieDetails(movie){
  $('#movie_data').html('');

  var headerElement = $('<h2 />');
  var paragraphElement = $('<blockquote />');
  var poster = $('<img src="'+ movie.Poster +'"/>');
  var title = movie.Title;
  var year = movie.Year;
  var plot = movie.Plot;
  var imdbRating = movie.imdbRating;
  headerElement.append(title + ' ' + year + "[" + imdbRating + "]");
  headerElement.appendTo('#movie_data');
  poster.insertAfter(headerElement);
  paragraphElement.append(plot);
  paragraphElement.insertAfter(poster);
}

$(document).ready(function(){
  $('#search_box').on('keyup submit', function(event){
    event.preventDefault();
    var search = $('#search_box');
    var query = search.val();
    $.ajax({
      url: 'http://www.omdbapi.com/?s='+query,
      method: 'get',
      dataType: 'jsonp',
      success: function(movieName){
        $('#search_results').html('');
        var movieList = movieName.Search;
        for(var i = 0; i < movieList.length; i += 1){
          var movie = movieList[i]['Title'];
          var year = movieList[i]['Year'];
          var id = movieList[i]['imdbID'];
          var result = $('<li data-id="' + id + '"></li>');
          var link = $('<a href="#"></a>');
          var list = $('#search_results');
          link.append(movie, year);
          result.append(link);
          list.append(result);
        }
      },
     error: errorSlidingDown
    });
  });
 $('#search_results').on('click', 'li', function(){
    var id = $(this).attr('data-id');
    $.ajax({
      url: 'http://www.omdbapi.com/?i='+id,
      method: 'get',
      dataType: 'jsonp',
      success: showMovieDetails,
      error: errorSlidingDown
    });
  });
  $('.btn').on('click', function(event){
    event.preventDefault();
  });
});

  //   var query = $('#search_box').val();
  //   $.ajax({
  //     url: 'http://www.omdbapi.com/?s='+query,
  //     method: 'get',
  //     dataType: 'json',
  //     success: function(movie){
  //       console.log(movie);
  //     }
      // error: function(){
      //   $('.error').slideDown();
      //   setTimeout(function(){$('.error').slideUp();}, 3000);
      // }
    // });
