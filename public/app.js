
$('.button-submit').on('click', () => {
  alert('Submit button clicked');
})


$('.button-retrieve').on('click', () => {
  $.ajax({
    url: "localhost:3000/retrieve",
    type: "GET",
    success: () => {
      console.log('Successfully triggered GET request to server.')
    }
  })
})
