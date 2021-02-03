
$('.button-submit').on('click', (event) => {
  event.preventDefault();

  $.ajax({
    url: "http://localhost:5500/submit",
    type: "GET",
    success: () => {
      console.log('Successfully triggered POST request to server.')
    }
  })
})


$('.button-retrieve').click((event) => {
  event.preventDefault();

  $.ajax({
    url: "http://localhost:5500/retrieve",
    type: "GET",
    success: () => {
      console.log('Successfully triggered GET request to server.')
    }
  })
})
