var isDyslexic = false;
function fontCookieCheck() {
  var infoInCookie = readCookie('178fontcookie');
  isDyslexic = eval(infoInCookie);
    if (isDyslexic == true) {
      var font = "Open Dyslexic";
    } else {
      var font = "Open Sans";
    }
    setFont(font);
}

// If you want to use this make sure to install SweetAlert2 and Promise
/*function fontAlert1() {
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
}*/

function createFontCookie(font4Cookie) {
  createCookie('178fontcookie',font4Cookie,5475);
  isDyslexic = eval(font4Cookie);
  fontCookieCheck();
}

function toggleFont() {
  if (isDyslexic == true) {
    isDyslexic = false;
    setFont("Open Sans");
  } else {
    isDyslexic = true;
    setFont("Open Dyslexic");
  }
  createFontCookie(isDyslexic.toString());
}

function setFont(font) {
  if (font != null) {
    $("body").css('fontFamily', font);
    $(".swal2-modal").css('fontFamily', font);
    $("button").css('fontFamily', font);
    $("#font-stuff").css('display', 'block');
    // TODO: Make things look *more* correct by setting specific styles to be different.
    // This part makes everything zoom out to look like it's the right size:
    if (isDyslexic == true) {
      $('body').css('zoom', .95);
      $('#picshoembed').css('zoom', 1.25);
      $('.switch-input')[0].checked = true;
    } else {
      $('.switch-input')[0].checked = false;
      $('body').css('zoom', 1);
    }
  }
}

$(document).ready(fontCookieCheck); // Runs the function fontCookieCheck everytime the page loads.
