
$('.button-submit').on('click', (event) => {
  var userName_submit = $('.input-name').val();
  var recipeURL = $('.input-recipe').val().toString();


  console.log('userName: ', userName_submit);
  console.log('recipeURL: ', recipeURL);

  event.preventDefault();
  // event.stopPropogation();

  console.log('event: ', event);

  $.ajax({
    url: "http://localhost:5500/submit",
    type: "POST",
    data: {
      user: userName_submit,
      recipe: recipeURL
    },
    dataType: "text",
    success: (results) => {
      console.log('Successfully triggered POST request to server: ', results);
      $('body').html(results);
    },
    error: (error) => {
      console.log('Error in POST response!: ', error);
    }
  })
})


$('.button-retrieve').click((event) => {
  event.preventDefault();
  // event.stopPropogation();
  var userName_retrieve = $('.input-name').val();

  $.ajax({
    url: "http://localhost:5500/retrieve",
    type: "GET",
    data: {
      user: userName_retrieve
    },
    contentType: "application/json",
    success: (results) => {
      console.log('Successfully triggered GET request to server: ', results);
      $('body').html(results);
    },
    error: (error) => {
      console.log('Error in GET response!: ', error);
    }
  })
})
