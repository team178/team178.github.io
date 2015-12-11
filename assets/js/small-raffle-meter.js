google.load('visualization', 1.0);
google.setOnLoadCallback(test);
function test() {
  var opts = {sendMethod: 'auto'};
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1X8Ba3bd-JEhASUNs5VDcA18dTPyxIS5lwxRKBBKWKqs/edit#gid=0', opts);
  query.setQuery('select F');
  query.send(handleQueryResponse);

  setTimeout(function(){ test(); }, 100);
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
  var tagA = sheet.addElementToTag("#raffle-meter-sold", widthSold);
  var widthOut = new StyleSheetElement("width", outPercent + '%');
  var tagB = sheet.addElementToTag("#raffle-meter-out", widthOut);
  console.log(sheet);
  addInlineStyleSheet(sheet);
  
   // For text
  var deadline = new Date(2015, 11, 10, 20, 15, 0); // note: month is 0-11 but date starts at 1
  var numDays = Math.ceil((deadline - new Date())/60000);
 
  var money = sold * 100;
 
  var soldPercentString = soldPercent.toString(); // turns the double into a string
  var soldPercentShort = soldPercentString.substring(0, 5); // makes length of sold percentage 5 characters long
 
  if numdays == 0 {
    $("#percent").html("Tickets sold: " + soldPercentShort + "% | $" + money + "+ earned | No time left! | <a class='raffle-link' href='/raffle'>About >></a>");
 } else {
    $("#percent").html("Tickets sold: " + soldPercentShort + "% | $" + money + "+ earned | Only " + numDays + " minutes left! | <a class='raffle-link' href='/raffle'>About >></a>");
 }
  $("#raffle-meter-container").show(1000);
}
