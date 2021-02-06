
$('.button-submit').on('click', (event) => {
  var userName_submit = $('.input-name').val();
  var recipeName = $('.input-recipe-name').val().toString();
  var recipeURL = $('.input-recipe').val().toString();

  event.preventDefault();

  $.ajax({
    url: "http://localhost:5500/submit",
    type: "POST",
    data: {
      user: userName_submit,
      recipe_name: recipeName,
      recipe: recipeURL
    },
    dataType: "text",
    success: (results) => {
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
      $('body').html(results);
    },
    error: (error) => {
      console.log('Error in GET response!: ', error);
    }
  })
})
