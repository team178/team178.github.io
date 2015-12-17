// Note: The month is 0-11 but date starts at 1
var raffle_deadline = new Date(2015, 11, 10, 20, 15, 0); // Make sure to set this to the proper deadline
var numDays = Math.ceil((raffle_deadline - new Date())/3600000);

var container;
var soldTag; // blue
var outTag; // yellow

$( document ).ready(function() {
  // Does not do this stuff until all the elements on the page are done rendering.
if($("#raffle-meter-container").length > 0) { // length = number of elements with this id
    container = "#raffle-meter-container";
    soldTag = ".halfStyle.hs-vertical-third:before";
    outTag = ".halfStyle.hs-vertical-third:after";
  } else {
    container = "#raffle-meter-container-s";
    soldTag = "#raffle-meter-sold";
    outTag = "#raffle-meter-out";
  }

if(/*numDays >= -2 &&*/ true) { // The true is there so that you can manually turn this off before the two days after.
  google.load('visualization', 1.0);

  google.setOnLoadCallback(get_data);
  function get_data() {
    var opts = {sendMethod: 'auto'};                // Make sure to change the link to the proper spreadsheet
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1X8Ba3bd-JEhASUNs5VDcA18dTPyxIS5lwxRKBBKWKqs/edit#gid=0', opts);
    query.setQuery('select F'); // Make sure to select the proper column
    query.send(handleQueryResponse);
    // Note: The function will only refresh when page is refreshed
  /*
    if(numDays <= 1 && numDays > (1/24)) { // Makes function automatically refresh every 30 seconds when there's only a day left
      setTimeout(function(){ get_data(); }, 30000);
    } else if(numDays <= (1/24)) { // Makes function automatically refresh every 100 miliseconds when there's only an hour left
      setTimeout(function(){ get_data(); }, 100);
    }*/
  }
  function handleQueryResponse(response){
    if(response.isError()){
      console.log('Error: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    var data = response.getDataTable();
    var base = 0;
    var sold = 0;
    var out = 0;
    for(var i = 0; i < data.getNumberOfRows(); i++){
      if(data.getValue(i,0) == 0) {
        base += 1;
      } else if(data.getValue(i,0) == 1) {
         out += 1;
      } else if(data.getValue(i,0) == 2) {
         sold += 1;
      }
    }        

    var soldPercent = sold / (sold + out + base) * 100;
    var outPercent = (out + sold) / (sold + out + base) * 100;
    
    var sheet = new StyleSheet();
    var widthSold = new StyleSheetElement("width", soldPercent + '%');
    var tagA = sheet.addElementToTag(soldTag, widthSold);
    var widthOut = new StyleSheetElement("width", outPercent + '%');
    var tagB = sheet.addElementToTag(outTag, widthOut);
    addInlineStyleSheet(sheet);
    
     // For text
    var money = sold * 100;
    var soldPercentString = soldPercent.toString(); // turns the double into a string
    var soldPercentShort = soldPercentString.substring(0, 5); // makes length of sold percentage 5 characters long

    var timeLeft;
    if(numDays > 1) {
      // in days
      var timeLeft = numDays + "days left"
    } else if(numDays <= 1 && numDays > (1/24)) {
      // in hours
      var timeLeft = numDays / 24 + "hours left"
    } else if(numDays <= (1/24) && numDays > 0) {
      // in minutes
      var timeLeft = "Only" + numDays / 1440 + "minutes left!"
    } else{
      // no time left
      var timeLeft = "There's no more time!"
    }
    $("#percent").html("Tickets sold: " + soldPercentShort + "% | $" + money + "+ earned | "+ timeLeft +"| <a class='raffle-link' href='/raffle'>About >></a>");
    $(container).show(1000);
  }

// This will be run if you change the true to a false.
} else { 

  var sheet = new StyleSheet();
  var deliberateSold = 67.58; // Set this manually
  var widthSold = new StyleSheetElement("width", deliberateSold + '%');
  var tagA = sheet.addElementToTag(soldTag, widthSold);
  // The outPercent has been removed because it isn't useful information anymore.
  addInlineStyleSheet(sheet);
  //                                      Set this manually   V V V V
  $("#percent").html("Tickets sold: " + deliberateSold + "% | $11,300 earned | "+ "Thanks for supporting us!" +" | <a class='raffle-link' href='/raffle'>About >></a>");
  
  // This changes the tooltip to not include the checkout part.
  if($("#raffle-meter-container").length > 0) document.getElementById("raffle-tooltip").setAttribute("data-content", "Blue: Tickets sold");
  $(container).show(1000);
}
});