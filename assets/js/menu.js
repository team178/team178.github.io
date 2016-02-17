$(function() {
  $("#menu-toggle").click(function() {
    toggleMenu();
  });
});

function toggleMenu() {
    $("#nav").toggleClass('show');
}
