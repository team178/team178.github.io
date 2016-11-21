/*
Hi! If you're reading this then you're probably not me. That means that you also
probably don't understand how this works.I'll try and help you understand.
There're a bunch of comments scattered around that should help you along. I
would suggest that you read through this code carefully; the things that you
have to change manually should be clearly marked, However, if they aren't
everything should be explained below.
THINGS TO ENTER IN YOURSELF:
* The date and time that the raffle ends.
* The number of days after the raffle that you want the meter content to change.
* The link to the Google Sheet that the information is being stored in.
* The column that the status of the tickets is recorded in.
* The characters that are used to symbolize each state of the tickets. (If you
change it for whatever reason, please also change the comment to match.)
*(maybe) The amount "sold" is multiplied by to create the money variable. (It's
explained more at the specific place in the code.)
* The message that automatically shows up when the raffle ends. (I'm still iffy
on what I've written there.)
* The year that it currently is. (I'm sure there's a way to dynamically change
that but I don't feel like coding that right now.)

WHAT THIS CODE DOES:
It pulls information from a Google Spreadsheet and counts the number of 0s ,1s,
and 2s there are in a specified column. The number of 0s is counted as the
number of booklets that haven't been touched; the number of 1s counts as the
booklets that're out being sold; and the 2s count as the number of booklets that
have been sold. These numbers are then turned into statistics that get displayed
on the website as the progress bar. There are two different ways it gets
displayed based on if large-raffle-meter = true in the front matter of the page.

If you're /still/ confused after reading all of this please contact either
[Tim Scalzo](19scalzoti@fpsct.org) or [Giselle Koo](gisellegk@gmail.com) for
help. (Yes, I realize that this isn't actually markdown; I just wanted to do
that.)

Thank you for taking the time to read this.
~~~~~~-Tim Scalzo
*/
google.load('visualization', 1.0);
// For info on how `Date()` is formatted, check out http://www.w3schools.com/jsref/jsref_obj_date.asp
var raffle_deadline = new Date(2016, 11, 13, 19, 30, 0); // Make sure to set this to the proper deadline.
var numDays = Math.ceil((raffle_deadline - new Date())/86400000);

var container; // entire progress bar
var soldTag; // blue
var outTag; // yellow
var rafflePage; // if large raffle meter, it must be on raffle page (that's how it works right now, don't judge me)

$( document ).ready(function() {
  // Does not do this stuff until all the elements on the page are done loading.
  if($("#raffle-meter-container").length > 0) { // Length is the number of elements with this id.
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

  if(numDays >= -2 && true) { // The true is there so that you can manually turn this off before the two days after if you want.

    google.setOnLoadCallback(get_data);
    function get_data() {
      var opts = {sendMethod: 'auto'};                // Make sure to manually change the link to the proper Google Sheet.
      var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1xEjQEKM2FLlj_dGCjKW4JWWDM-gDN0r2YXIFon_zraM/edit#gid=0', opts);
      query.setQuery('select F'); // Make sure to manually select the proper column.
      query.send(handleQueryResponse);
      // Note: The function will only run when the page is loaded.

      if(numDays <= 1 && numDays > (1/24)) { // Makes function automatically refresh every minute when there's only a day left
        setTimeout(function(){ get_data(); }, 60000);
      } else if(numDays <= (1/24)) { // Makes function automatically refresh every 100 miliseconds when there's only an hour left
        setTimeout(function(){ get_data(); }, 100);
      }
    }
    function handleQueryResponse(response){ // This function uses the data gathered to make percents and send them to the meter
      if(response.isError()){ // This makes sure you get a usable error message (in case anything goes wrong).
        console.log('Error: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
      }
      var data = response.getDataTable();
      var base = 0;
      var sold = 0;
      var out = 0;
      for(var i = 0; i < data.getNumberOfRows(); i++){ // The i++ adds 1 to 'i' after it goes through the loop once.
        if(data.getValue(i,0) == 0 || data.getValue(i,0) == 9) { // Checks for 0 and 9 in row 'i'.
          base += 1; // Adds 1 to the base if ^^^^ is true.
        } else if(data.getValue(i,0) == 1 || data.getValue(i,0) == 3) { // Checks for 1 and 3 in row 'i'.
          out += 1;
        } else if(data.getValue(i,0) == 2) { // Checks for a 2 in row 'i'.
          sold += 1;
        }
      /* In this loop, 'i' is used as the row number. As long as 'i' is less than the number of rows there are, the loop keeps going.
        It goes through and checks row 'i' to see if the number in it matches 0, 1, or 2. If there's anything other than those
        numbers it ignores it. I'm not quite sure what it does if it sees "1 2" or something else. Maybe it'll add 1 to both
        out and sold? */
      }

      var soldPercent = sold / (sold + out + base) * 100; // Divides the amount sold by the total and makes it into percent form.
      var outPercent = (out + sold) / (sold + out + base) * 100;

      var sheet = new StyleSheet(); // Creates a kind of "false" CSS file that the widths are inserted into.
      var widthSold = new StyleSheetElement("width", soldPercent + '%'); // Puts sold info into widthSold.
      var tagA = sheet.addElementToTag(soldTag, widthSold); // Injects widthSold into soldTag.
      var widthOut = new StyleSheetElement("width", outPercent + '%'); // Puts out info into widthOut.
      var tagB = sheet.addElementToTag(outTag, widthOut); // Injects widthOut into outTag.
      addInlineStyleSheet(sheet); // Adds the stuff in the StyleSheet to the referenced tags.

      // For text
      var money = sold * 100; // Each 1 in sold is a booklet. When I made this each booklet was worth $100.00; change this if that changes.
      var soldPercentString = soldPercent.toString(); // Turns the double into a string.
      var soldPercentShort = soldPercentString.substring(0, 5); // Makes the length of the sold string 5 characters long.

      var timeLeft; // Generates the phrase that is the time left.
      if(numDays > 1) { // in days
        var timeLeft = numDays + " days left"
      } else if(numDays <= 1 && numDays > (1/24)) { // in hours
        var timeLeft = numDays / 24 + " hours left"
      } else if(numDays <= (1/24) && numDays > 0) { // in minutes
        var timeLeft = "Only " + numDays / 1440 + " minutes left!"
      } else { // no time left
        var timeLeft = "There's no time left!"
      }
      $("#percent").html("Tickets sold: " + soldPercentShort + "% | $" + money + "+ earned | "+ timeLeft);
      if (!rafflePage) {
        $("#percent").append("<span class='raffle-link'> | <a href='/raffle'>About the raffle >></a></span>");
      }
    }

  // This will run if you change the true to a false; it'll also change if the days after the raffle exceeds two.
  } else {
    var sheet = new StyleSheet(); // Creates a kind of "false" CSS file that the widths are inserted into.
    var deliberateSold = 68.28; // Set this percent manually.
    var widthSold = new StyleSheetElement("width", deliberateSold + '%'); // Puts manual sold info into widthSold.
    var tagA = sheet.addElementToTag(soldTag, widthSold); // Injects widthSold into soldTag.
    // The outPercent has been removed because it isn't useful information now that the raffle is over.
    addInlineStyleSheet(sheet); // Adds the stuff in the StyleSheet to the referenced tags.
    //                                                                   Set this manually.  V V V V
    $("#percent").html("Our 2016 raffle has ended! | Tickets sold: " + deliberateSold + "% | $11,250+ earned");
    if (!rafflePage) {
      $("#percent").append(" | <a href='/raffle'>Winners >></a></span>");
    } else {
      // This changes the line of info to not include the tickets checked out
      $('#progress-info').html("Blue: Tickets sold | Yellow: Tickets not sold");
    }
  }
});
