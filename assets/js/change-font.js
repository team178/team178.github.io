function fontCookieCheck() {
  var fontInCookie = readCookie('178fontcookie');
  if (!fontInCookie) {
    fontAlert1();
  } else {
      if (fontInCookie == "Open Dyslexic") {
      var font = "Open Dyslexic";
    } else if (fontInCookie == "Open Sans") {
      var font = "Open Sans";
    }
    setFont(font);
    return font;
  }
}

function fontAlert1() {
  swal({
    title: 'Dyslexia Font',
    text: 'To use the dyslexia friendly font <i>Open Dyslexic</i> on this site click, the button below.',
    type: 'info',
    showCancelButton: true,
    confirmButtonText: 'Open Dyslexic',
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then(function setFont4Cookie(isConfirm) {
    if (isConfirm) {
      createFontCookie("Open Dyslexic");
      swal({
        title: 'You\'ve set the font!',
        text: 'To change the font temporarily, toggle the switch at the bottom of the page.<br><br>To change your settings back to the original font, click the button next to the switch.',
        showCloseButton: true,
        type: 'success',
      });
    } else if (isConfirm == false) {
      createFontCookie("Open Sans");
      swal({
        title: 'You\'ve kept the same font!',
        text: 'To change the font temporarily, toggle the switch at the bottom of the page.<br><br>To change your settings to use <i>Open Dyslexic</i>, click the button next to the switch.',
        showCloseButton: true,
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

function createFontCookie(font4Cookie) {
  createCookie('178fontcookie',font4Cookie,5475);
  fontCookieCheck();
}

function toggleFont() {
  if (document.body.style.fontFamily = "Open Sans") {
    var font = "Open Dyslexic";
  } else {
    var font = "Open Sans";
  }
  setFont(font);
}

function fontAlert2() {
  swal({
    title: 'Which font?',
    type: 'question',
    showCancelButton: true,
    confirmButtonText: 'Open Dyslexic',
    cancelButtonText: 'Open Sans',
    cancelButtonColor: '#3085d6',
    showCloseButton: true,
  }).then(function setFont4Cookie(isConfirm) {
    if (isConfirm) {
      createFontCookie("Open Dyslexic");
      swal({
        title: 'The font is Open Dyslexic!',
        text: 'To change the font temporarily, toggle the switch at the bottom of the page.',
        showCloseButton: true,
        type: 'success',
      });
    } else if (isConfirm == false) {
      createFontCookie("Open Sans");
      swal({
        title: 'The font is Open Sans!',
        text: 'To change the font temporarily, toggle the switch at the bottom of the page.',
        showCloseButton: true,
        type: 'success',
      });
    } else {
      swal(
        'Nothing\'s changed',
        'To change the font temporarily, toggle the switch at the bottom of the page.<br><br>To change your settings to use a different font, click the button next to the switch.'
      );
    }
  });
}

function setFont(font) {
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
