/*
Hi! If you're reading this then you're probably not me. That means that you also
probably don't understand how this works.I'll try and help you understand. There
are a bunch of comments scattered around that should help you along. I would
suggest that you read through this code carefully; the things that you have to
change manually should be clearly marked, However, if they aren't everything
should be explained below.
THINGS TO ENTER IN YOURSELF:
* The date and time that the raffle ends.
* The number of days after the raffle that you want the meter content to change.
* The link to the Google Sheet that the information is being stored in.
* The column that the status of the books is recorded in.
* The column that the number of tickets sold is recorded in.
* The characters that are used to symbolize each state of the tickets. (If you
change it for whatever reason, please also change the comment to match.)
*(maybe) The amount "sold" is multiplied by 5 to create the money variable. (It's
explained more at the specific place in the code.)
* The message that automatically shows up when the raffle ends. (I'm still iffy
on what I've written there.)
* The year that it currently is. (I'm sure there's a way to dynamically change
that but I don't feel like coding that right now.)

WHAT THIS CODE DOES:
It pulls information from a Google Spreadsheet and counts the number of 0s, 1s,
2s, 3s, and 4s there are in a specified column. The number of 0s is counted as
the number of book that haven't been touched; the 1s count as the books that are
checked out being sold; the 2s count as the number of full books that have been
sold; the 3s mark original partial books; and the 4s only appear after 3s to
mark that row as the rest of the above partial book. These numbers are then
turned into statistics that get displayed on the website as the progress bar.
There are two different ways it gets displayed based on if large-raffle-meter is
true in the front matter of the page.

If you're *still* confused after reading all of this please contact either
Tim Scalzo (19scalzoti@fpsct.org) or Giselle Koo (gisellegk@gmail.com) for
help.

Thank you for taking the time to read this.
~~~~~~-Tim Scalzo
*/
google.load('visualization', 1.0);
// For info on how `Date()` is formatted, check out http://www.w3schools.com/jsref/jsref_obj_date.asp
var raffleDeadline = new Date(2018, 11, 8, 16, 30, 0); // Make sure to set this to the proper deadline.
var millisecondsLeft = raffleDeadline - new Date();
var numDays = Math.ceil(millisecondsLeft/86400000);

var container; // entire progress bar
var soldTag; // blue
var outTag; // yellow
var rafflePage; // if large raffle meter, it must be on raffle page (that's how it works right now, don't judge me)

$( document ).ready(function() {
  // Does not do this stuff until all the elements on the page are done loading.
  if ($("#raffle-meter-container").length > 0) { // Length is the number of elements with this id.
    container = "#raffle-meter-container";
    soldTag = ".halfStyle.hs-vertical-third:before";
    outTag = ".halfStyle.hs-vertical-third:after";
    rafflePage = true;
  } else {
    container = "#raffle-meter-container-s";
    soldTag = "#raffle-meter-sold";
    outTag = "#raffle-meter-out";
    rafflePage = false;
  }

  if (numDays >= -2 && true) { // The true is there so that you can manually turn this off before the two days after if you want.

    google.setOnLoadCallback(get_data);
    function get_data() {
      var opts = {sendMethod: 'auto'};                // Make sure to manually change the link to the proper Google Sheet.
      var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1HXNfZArZZSwAI_QYgPCZ0y4J6Gjur-6FA4qe_dhje2Q/edit#gid=0', opts);
      query.setQuery('SELECT G, H'); // Make sure to manually select the proper columns. (Use SQL if you need to do something more complex.)
      query.send(handleQueryResponse);
      // Note: The function will only run when the page is loaded.

      if (numDays <= 1 && numDays > (1/24)) { // Makes function automatically refresh every minute when there's only a day left
        setTimeout(function(){ get_data(); }, 60000);
      } else if (numDays <= (1/24)) { // Makes function automatically refresh every 100 miliseconds when there's only an hour left
        setTimeout(function(){ get_data(); }, 100);
      }
    }
    function handleQueryResponse(response){ // This function uses the data gathered to make percents and send them to the meter
      if (response.isError()){ // This makes sure you get a usable error message (in case anything goes wrong).
        console.log('Error: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
      }
      var data = response.getDataTable();
      data.Nf.splice(0, 2); // Removes the first row that has stuff that we don't want.
      var base = 0;
      var sold = 0;
      var out = 0;
      for (var i = 0; i < data.getNumberOfRows(); i++){ // The i++ adds 1 to 'i' after it goes through the loop once.
      /* Key for what the values mean: */
      // 0 = untouched (base)
      // 1 = checked out (out)
      // 2 = full book sold (sold)
      // 3 = original partial book (sold & out)
      // 4 = other partial books; only happens after a 3 (sold & out)
      /* Key for what the columns are for: */
      // 0 = Status of book
      // 1 = Number of tickets sold from book
        if (data.getValue(i,0) == 0) { // Checks for 0 in row 'i'.
          base += 20; // Adds 20 to the base if ^^^^ is true.
        } else if(data.getValue(i,0) == 1) { // Checks for 1 in row 'i'.
          out += 20; // Adds 20 to the out if ^^^^ is true.
        } else if(data.getValue(i,0) == 3) { // Checks for 3 in row 'i'.
          sold += data.getValue(i,1); // Adds value in second column to the sold if ^^^^ is true.
          out += (20 - data.getValue(i,1)); // Adds the amount left in the book to the out.
        } else if(data.getValue(i,0) == 4) { // Checks for 4 in row 'i'.
          sold += data.getValue(i,1); // Shouldn't be total sold from book (it should be how much they just sold).
          out -= data.getValue(i,1); // Removes the amount sold from the out. (Because it's not out anymore, it just got sold.)
        } else if(data.getValue(i,0) == 2) { // Checks for a 2 in row 'i'.
          sold += 20; // Adds 20 to sold if the entire book is sold.
        }
      /*
      In this loop, 'i' is used as the row number. As long as 'i' is less than the number of rows there are, the loop keeps going.
      It goes through and checks row 'i' to see if the number in it matches 0, 1, 2, 3 or 4. If there's anything other than those
      numbers it ignores it.
      */
      }

      var soldPercent = sold / (sold + out + base) * 100; // Divides the amount sold by the total and makes it into percent form.
      var outPercent = (out + sold) / (sold + out + base) * 100;

      if (rafflePage) {
        $('<style id="soldTagStyle">' + soldTag + '{width:' + soldPercent + '%}</style>').appendTo('head'); // Sets the soldTag's width to the soldPercent
        $('<style id="outTagStyle">' + outTag + '{width:' + outPercent + '%}</style>').appendTo('head'); // Sets the outTag's width to the outPercent
      } else {
        $(soldTag).css('width', soldPercent + '%'); // Sets the soldTag's width to the soldPercent
        $(outTag).css('width', outPercent + '%'); // Sets the outTag's width to the outPercent
      }

      // For text
      var money = sold * 5; // Each 1 in sold is a ticket. When I made this each ticket was worth $5.00; change this if that changes.
      var soldPercentString = soldPercent.toString(); // Turns the double into a string.
      var soldPercentShort = "";
      if (soldPercent < 10) { // When the percent is less than 10,
        soldPercentShort = soldPercentString.substring(0, 4); // ensures there's only 2 decimal places.
      } else { // When the percent is more than 10,
        soldPercentShort = soldPercentString.substring(0, 5); // ensures there's only 2 decimal places.
      }

      var timeLeft; // Generates the phrase that is the time left.
      if (numDays > 1) { // 1 day
        timeLeft = numDays + " days left";
      } else if (millisecondsLeft > 3600000) { // 1 hour
        var hoursLeft = Math.round(millisecondsLeft / 3600000);
        if (hoursLeft > 1) {
          timeLeft = hoursLeft + " hours left";
        } else {
          timeLeft = hoursLeft + " hour left";
        }
      } else if (millisecondsLeft > 0) { // 0 minutes
        var minutesLeft = Math.round(millisecondsLeft / 60000);
        if (minutesLeft > 1) {
          timeLeft = minutesLeft + " minutes left";
        } else {
          timeLeft = minutesLeft + " minute left";
        }
      } else { // no time left
        timeLeft = "There's no time left!";
      }
      $("#percent").html("Tickets sold: " + soldPercentShort + "% | $" + money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " earned | "+ timeLeft);
      if (!rafflePage) {
        $("#percent").append("<span class='raffle-link'> | <a href='/raffle'>About the raffle >></a></span>");
      }
    }

  // This will run if you change the true to a false; it'll also change if the days after the raffle exceeds two.
  } else {
    var deliberateSoldPercent = XX.XX; // Set this number manually.
    var deliberateMoney = XXXXX; // Set this number manually.

    if (rafflePage) {
      $('<style>' + soldTag + '{width:' + deliberateSoldPercent + '%}</style>').appendTo('head'); // Sets the soldTag's width to the deliberateSoldPercent
    } else {
      $(soldTag).css('width', deliberateSoldPercent + '%'); // Sets the soldTag's width to the deliberateSoldPercent
    }
    $("#percent").html("Our " + raffleDeadline.getFullYear() + " raffle has ended! | Tickets sold: " + deliberateSoldPercent + "% | $" + deliberateMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " earned");
    if (!rafflePage) {
      $("#percent").append("<span class='raffle-link'> | <a href='/raffle'>Winners >></a></span>");
    } else {
      // This changes the line of info to not include the tickets checked out
      $('#progress-info').html("Blue: Tickets sold | White: Tickets not sold");
    }
  }
});
