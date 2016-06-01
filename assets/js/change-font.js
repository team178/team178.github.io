var font = null;
var font4Cookie = null;
var fontInCookie = null;
function fontCookieCheck() {
  fontInCookie = readCookie('178fontcookie');
  if (!fontInCookie) {
    font = null;
    fontAlert1();
  } else {
      if (fontInCookie == "Open Dyslexic") {
      font = "Open Dyslexic";
    } else if (fontInCookie == "Open Sans") {
      font = "Open Sans";
    }
    setFont();
  }
}

function fontAlert1() {
  swal({
    title: 'Dyslexia Font',
    html: 'We have added support for using a dyslexia friendly font on this site. The font is called "Open Dyslexic" and if you would like to use it please click the button below.<br><br>If you don\'t want to use a special font, click cancel.',
    type: 'info',
    showCancelButton: true,
    confirmButtonText: 'Open Dyslexic',
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then(function setFont4Cookie(isConfirm) {
    if (isConfirm) {
      font4Cookie = "Open Dyslexic";
      createFontCookie();
      swal({
        title: 'You\'ve set the font!',
        text: 'If you ever want to change the font temporarily, toggle the switch at the bottom of the page.<br><br>If you want to change your settings back to the original font, click the button next to the slider.',
        showCloseButton: true,
        timer: 10000,
        type: 'success',
      });
    } else if (isConfirm == false) {
      font4Cookie = "Open Sans";
      createFontCookie();
      swal({
        title: 'You\'ve kept the same font!',
        text: 'If you ever want to change the font temporarily, toggle the switch at the bottom of the page.<br><br>If you want to change your settings to use Open Dyslexic, click the button next to the slider.',
        showCloseButton: true,
        timer: 10000,
        type: 'success',
      });
    } else {
      swal(
        'Uhhhh...',
        'So... This shouldn\'t be possible. I\'m not sure why this happened... Email me: timtv25@gmail.com',
        'error'
      );
    }
  });
}

function createFontCookie() {
  createCookie('178fontcookie',font4Cookie,5475);
  fontCookieCheck();
}

function toggleFont() {
  if (document.body.style.fontFamily = "Open Sans") {
    font = "Open Dyslexic";
  } else {
    font = "Open Sans";
  }
  setFont();
}

function fontAlert2() {
  swal({
    title: 'Which font do you want to use?',
    type: 'question',
    showCancelButton: true,
    confirmButtonText: 'Open Dyslexic',
    cancelButtonText: 'Open Sans',
    cancelButtonColor: '#3085d6',
    showCloseButton: true,
  }).then(function setFont4Cookie(isConfirm) {
    if (isConfirm) {
      font4Cookie = "Open Dyslexic";
      createFontCookie();
      swal({
        title: 'The font is Open Dyslexic!',
        text: 'If you ever want to change the font temporarily, toggle the switch at the bottom of the page.',
        showCloseButton: true,
        timer: 10000,
        type: 'success',
      });
    } else if (isConfirm == false) {
      font4Cookie = "Open Sans";
      createFontCookie();
      swal({
        title: 'The font is Open Sans!',
        text: 'If you ever want to change the font temporarily, toggle the switch at the bottom of the page.',
        showCloseButton: true,
        timer: 10000,
        type: 'success',
      });
    } else {
      swal(
        'No changes have been made',
        'If you ever want to change the font temporarily just toggle the switch at the bottom of the page.<br><br>If you want to change your settings to use Open Dyslexic, click the button next to the slider.'
      );
    }
  });
}

function setFont() {
  if (font != null) {
    document.body.style.fontFamily = font;
    // This part makes everything zoom out to look like it's the right size.
    // TODO: Make things look *more* correct by setting other styles to be different.
    if (font == "Open Dyslexic") {
      document.body.style.zoom = .95;
    } else {
      document.body.style.zoom = 1;
    }
  }
}

/*$( window ).load(fontCookieCheck);*/ // Runs the function fontCookieCheck everytime the page loads.
