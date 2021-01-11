
var tbody = d3.select("#Stocks");

function init() {

  tbody.html("");

  stockData.forEach((datarow) => {

    var row = tbody.append("tr");

    Object.entries(datarow).forEach(([key, value]) => {
      console.log(key, value)
        var cell = row.append('td');
        cell.text(value)
    });
});
}

init()

function Plotbar(value) {

  var filteredData = samples.filter(event => parseInt(event.id) === parseInt(value))[0];
  const closingPrice = filteredData.map(close => {return close.close})
  const date = filteredData.map(dates => {return dates.date})

  var trace1 = {
    x: date,
    y: closingPrice,
    text: closingPrice,
    type: "bar"
  };
  
  var layout = {
    title: "",
    margin: {
      l:50,
      r:50,
      t:50,
      b:50,
    }
  }
  
  var chartData = [trace1];
  Plotly.newPlot("bar", chartData, layout);

}

function buildPlot() {
    d3.json('/api/candlestick').then((data) => {

        const volume = data.map(vol => { return parseInt(vol.volume)})   
        const timestamp = data.map(time => { return parseInt(time.timestamp)})      
        const timestamp2 = data.map(time => { return parseInt(time.timestamp)})      
        const high = data.map(high => {return high.high})
        const low = data.map(low => {return low.low})
        const cal = data.map(lp => {return lp.cal})
        const openPrice = data.map(openp => {return openp.open})
        const closingPrice = data.map(close => {return close.close})
        const date = data.map(dates => {return dates.date})
        const gtime = [2020, 01, 06]
        const sDate = '2020-01-06 14:30';
        const eDate = '2021-01-06 14:30';

        console.log(cal)

        console.log(closingPrice)        

        var TStrace1 = 
            {
            type: "scatter",
            mode: "lines",
            name: 'GE high',
            x: date,
            y: high,
            marker: {color: '#17BECF'}
        }
    
        var TStrace2 = 
            {
            type: "scatter",
            mode: "lines",
            name: 'GE low',
            x: date,
            y: low,
            line: {color: '#7F7F7F'}
        }
    
        var TSdata = [TStrace1, TStrace2];
          
        var TSlayout = {
            title: 'GE Overview'
        }

        Plotly.newPlot('plot', TSdata, TSlayout);


    })
    
}; 
buildPlot()
