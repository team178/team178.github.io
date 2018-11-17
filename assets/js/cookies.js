// This function is used to create cookies. Set the name, value, and days to:
// its name, the data it's storing, and how many days it should last.
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

// This function is used to read/find an existing cookie. Just pass the name of
// the cookie you're looking for.
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// This function deletes cookies. Just pass the name of the cookie and it'll set
// all of its values to zero and the computer will delete it automatically.
function eraseCookie(name) {
  createCookie(name,"",-1);
}
