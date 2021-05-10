window.addEventListener(
  'load',
  function () {
    var divOne = document.getElementById('one')

    divOne.addEventListener(
      'click',
      function () {
        console.log('外')
      },
      true
    )
  },
  false
)
