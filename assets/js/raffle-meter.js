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
        var red = 0;
        var green = 0;
        var purple = 0;

        for(var i = 0; i < data.getNumberOfRows(); i++){
          if(data.getValue(i,0) == 0) {
            red += 1;
          } else if(data.getValue(i,0) == 1) {
            purple += 1;
          } else if(data.getValue(i,0) == 2) {
            green += 1;
          }
        }        
        var redPercent = 100;
        var greenPercent = green / (green + purple + red) * 100;
        var purplePercent = (purple + green) / (green + purple + red) * 100;

        document.getElementById('percent').innerHTML = "Percent of tickets sold: " + greenPercent + "%";
        console.log(document.styleSheets);
        document.styleSheets[7].insertRule('.halfStyle.hs-vertical-third:before { width:' + greenPercent + '%; }', 0);
        document.styleSheets[7].insertRule('.halfStyle.hs-vertical-third:after { width:' + purplePercent + '%; }', 0);
      }