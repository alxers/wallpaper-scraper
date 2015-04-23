(function () {

  var doc = document,
      body = doc.getElementsByTagName('body')[0],
      createBtn = doc.getElementById('create'),
      saveBtn = doc.getElementById('save');

  // Random background image
  //body.style.backgroundImage = "url('/images/bg1.jpg')";

  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // pass
    }
  }

  // Functions
  function createWallpaper() {
    xmlhttp.open('GET', '/create', true);
    xmlhttp.send();
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  }

  // Event listeners
  createBtn.addEventListener('click', createWallpaper, false);

})()
