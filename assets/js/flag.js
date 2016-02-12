function toggleFlag() {
  if ($( window ).width() <= 950) { /* Checks if window width is below 950 pixels. */
    document.getElementsByClassName("flags")[1].style.display = "none";
/* Looks for all elements whose class is "flags" and makes the second one detected not visible. */
  }
  else { /* Does the below if window width isn't below 950 pixels. */
    document.getElementsByClassName("flags")[1].style.display = "block";
/* Looks for all elements whose class is "flags" and makes the second one detected visible. */
  }
}
$( window ).load(toggleFlag); /* Runs the function "toggleFlag" when the page loads. */
$( window ).resize(toggleFlag); /* Runs the function "toggleFlag" when the page is resized. */
