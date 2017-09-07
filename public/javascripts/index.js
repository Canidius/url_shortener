$('#longUrl').on('keyup', function(){
  $('#shortenDesiredURL').prop('disabled',true);
});

$('#shortenURL').on('click', function() {

  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {longUrl: $('#longUrl').val()},
    success: function (data) {
      if(data.error) {
        var resultHTML = '<p>'
          + data.message + '</p>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
      } else {
        var resultHTML = '<a class="" href="' + data.shortUrl + '">'
          + data.shortUrl + '</a>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
        $('#shortenDesiredURL').prop('disabled',false)
      }
    }
  })
});

$('#shortenDesiredURL').on('click', function() {

  $.ajax({
    url: '/api/shorten_desired',
    type: 'POST',
    dataType: 'JSON',
    data: {
      shortUrl: $('#shortUrl').val(),
      longUrl: $('#longUrl').val()
    },
    success: function (data) {
      var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
        + data.shortUrl + '</a>';
      $('#link').html(resultHTML);
      $('#link').hide().fadeIn('slow');
    }
  })
});