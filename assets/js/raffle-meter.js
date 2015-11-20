google.load('visualization', 1.0);
google.setOnLoadCallback(test);
function test() {
  var opts = {sendMethod: 'auto'};
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1X8Ba3bd-JEhASUNs5VDcA18dTPyxIS5lwxRKBBKWKqs/edit#gid=0', opts);
  query.setQuery('select F');
  query.send(handleQueryResponse);
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

  document.getElementById('percent').innerHTML = "Percent of tickets sold: " + soldPercent + "%";

  var sheet = new StyleSheet();
  var widthSold = new StyleSheetElement("width", soldPercent + '%');
  var tagA = sheet.addElementToTag(".halfStyle.hs-vertical-third:before", widthSold);
  var widthOut = new StyleSheetElement("width", outPercent + '%');
  var tagHover = sheet.addElementToTag(".halfStyle.hs-vertical-third:after", widthOut);
  console.log(sheet);
  addInlineStyleSheet(sheet);

}