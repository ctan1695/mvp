
$('.button-submit').on('click', (event) => {
  var userName = $('.input-name').val();
  var recipeURL = $('.input-recipe').val();


  console.log('userName: ', userName);
  console.log('recipeURL: ', recipeURL);

  event.preventDefault();
  // event.stopPropogation();

  console.log('event: ', event);

  $.ajax({
    url: "http://localhost:5500/submit",
    type: "POST",
    data: {
      user: userName,
      recipe: recipeURL
    },
    dataType: "json",
    success: () => {
      console.log('Successfully triggered POST request to server.')
    }
  })
})


$('.button-retrieve').click((event) => {
  event.preventDefault();
  // event.stopPropogation();

  $.ajax({
    url: "http://localhost:5500/retrieve",
    type: "GET",
    contentType: "application/json",
    success: () => {
      console.log('Successfully triggered GET request to server.')
    }
  })
})
