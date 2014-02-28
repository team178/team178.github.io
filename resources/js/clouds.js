$(function() {
  $(".cloud").bind('animationiteration', function() {
    var left = $("#" + this.id).css('left');
    left = left.substr(0, left.length-2); // remove px
    if ( left < 0) {
      $("#" + this.id).toggleClass("cyclenegclouds");
    } else {
      $("#" + this.id).toggleClass("cycleclouds");
    }
  });
});