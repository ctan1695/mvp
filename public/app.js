
$('.button-submit').on('click', (event) => {
  event.preventDefault();
  // event.stopPropogation();

  $.ajax({
    url: "http://localhost:5500/submit",
    type: "POST",
    contentType: "application/json",
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
