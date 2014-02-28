$(function() {
  $("#menu-toggle").click(function() {
    toggleMenu();
  });
});

function toggleMenu() {
  visibilityStatus = $("#nav").hasClass('show');
  if (!visibilityStatus) {
    $("#nav").addClass('show');
  } else {
    $("#nav").removeClass('show');
  }
}