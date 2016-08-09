var isDyslexic = "false";
function fontCookieCheck() {
  var fontInCookie = readCookie('178fontcookie');
  isDyslexic = fontInCookie;
  if (!fontInCookie) {
    fontAlert1();
  } else {
      if (isDyslexic == "true") {
        var font = "Open Dyslexic";
      } else {
        var font = "Open Sans";
      }
      setFont(font);
  }
}

function fontAlert1() {
  if (($(window).height() <= 565 && $(window).width() <= 675) || ($(window).height() <= 420) || ($(window).width() <= 420)) {
    isDyslexic = confirm("Would you like to use a Dyslexia friendly font on this website?");
    if (isDyslexic == true) {
      createFontCookie("true");
      alert("The font is now set to Open Dyslexic.\n\nTo change your settings, use the switch at the bottom of the page.")
    } else {
      createFontCookie("false")
      alert("The font is the same font it's always been.\n\nTo change your settings, use the switch at the bottom of the page.")
    }
  } else {
    $(".swal2-modal").css('fontFamily', 'Open Dyslexic');
    $("button").css('fontFamily', 'Open Dyslexic');
    swal({
      title: 'Dyslexia Font',
      text: 'To use the dyslexia friendly font <i>Open Dyslexic</i> on this site, select the button below.',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Open Dyslexic',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(function setFont4Cookie(isConfirm) {
      if (isConfirm) {
        createFontCookie("true");
        swal({
          title: 'You\'ve set the font!',
          text: 'To change your settings, toggle the switch at the bottom of the page.',
          showCloseButton: true,
          type: 'success',
        });
      } else if (isConfirm == false) {
        createFontCookie("false");
        swal({
          title: 'You\'ve kept the same font!',
          text: 'To change your settings, toggle the switch at the bottom of the page.',
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
}

function createFontCookie(font4Cookie) {
  createCookie('178fontcookie',font4Cookie,5475);
  isDyslexic = font4Cookie;
  fontCookieCheck();
}

function toggleFont() {
  if (isDyslexic == "true") {
    isDyslexic = "false";
    setFont("Open Sans");
  } else {
    isDyslexic = "true";
    setFont("Open Dyslexic");
  }
  createFontCookie(isDyslexic);
}

/*function fontAlert2() {
  $(".swal2-modal").css('fontFamily', 'Open Dyslexic');
  $("button").css('fontFamily', 'Open Dyslexic');
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
      createFontCookie("true");
      swal({
        title: 'The font is Open Dyslexic!',
        text: 'To change the font temporarily, toggle the switch at the bottom of the page.',
        showCloseButton: true,
        type: 'success',
      });
    } else if (isConfirm == false) {
      createFontCookie("false");
      swal({
        title: 'The font is Open Sans!',
        text: 'To change the font temporarily, toggle the switch at the bottom of the page.',
        showCloseButton: true,
        type: 'success',
      });
    } else {
      $(".swal2-modal").css('fontFamily', $("body").css('fontFamily'));
      $("button").css('fontFamily', $("body").css('fontFamily'));
      swal(
        'Nothing\'s changed',
        'To change the font temporarily, toggle the switch at the bottom of the page.<br><br>To change your settings to use a different font, select the button next to the switch.'
      );
    }
  });
}*/

function setFont(font) {
  if (font != null) {
    $("body").css('fontFamily', font);
    $(".swal2-modal").css('fontFamily', font);
    $("button").css('fontFamily', font);
    $("#font-stuff").css('display', 'block');
    // This part makes everything zoom out to look like it's the right size.
    // TODO: Make things look *more* correct by setting other styles to be different.
    if (isDyslexic == "true") {
      document.body.style.zoom = .95;
      $('.switch-input')[0].checked = true;
    } else {
      $('.switch-input')[0].checked = false;
      document.body.style.zoom = 1;
    }
  }
}

/*$( window ).load(fontCookieCheck);*/ // Runs the function fontCookieCheck everytime the page loads.
