// function loadTasks() {
//     // d3.json('/api/tasks').then((data) => {
//     //     data.forEach(things => {
//     //         var listGroup = d3.select("#tasks")
//     //         var listItem = listGroup.append("li");
//     //         listItem.text(things.description);
//     //         listItem.attr("class", "list-group-item");
//     //     });
//     // });

//     buildPlot()
// }

// colors = []
// var colors = d3.select("#stockList")
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

// loadTasks()


function Plotbar(value) {
  // var filteredData = samples.filter(event => parseInt(event.id) === parseInt(value))[0];
  // var sample_values = filteredData.sample_values.slice(0,10).reverse();
  // var otu_ids = filteredData.otu_ids.slice(0,10).reverse();
  // var otu_labels = filteredData.otu_labels.slice(0, 10).reverse();
  // otu_ids = otu_ids.map(id => `OTU ${id}`);
  // console.log(sample_values, otu_ids, otu_labels)
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

// var id = [];

function buildPlot() {
    d3.json('/api/candlestick').then((data) => {
      //   id = data.symbol;
      //   var selection = d3.select("#selDataset");
      //   id.forEach(id=> {
        //   var option = selection.append("option");
        //   option.property("value", id);
        //   option.text(id);
        // })
      // optionChanged(selection.property("value"));

        // d3.json(`/metadata/${sample}`).then((data) 
        // console.log(data)
        // console.log((data[0]))
        //var filteredData = samples.filter(event => parseInt(event.id) === parseInt(value))[0];   
        //var filteredData = data.filter(event => parseInt(event.id) === parseInt(value))[0];   
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
        // const initialval = high[0]
        // const reltval = []
        // for (var i = 0; i < high.length; i++) {
        //   reltval.push(((high[i]-initialval)/initialval)*10+1)
        // }
        // // return reltval
        console.log(cal)

        console.log(closingPrice)        
        // console.log(high)

      //   Plotly.plot('graph', [{
      //     x: date,
      //     y: cal,
      //     type: 'line'
      // }], 
      // {
      //   title: 'Some stocks'
      // }, 
      // {
      //     modeBarButtons: [[{
      //         name: 'June',
      //         click: function() {
      //           Plotly.relayout('graph',
      //             'xaxis.range', 
      //             [
      //               new Date(2020, 01, 06).getTime(),
      //               new Date(2021, 01, 06).getTime()
      //             ]
      //           );
      //         }
      //       }, {
      //         name: 'July',
      //         click: function() {
      //           Plotly.relayout('graph',
      //             'xaxis.range', 
      //             [
      //               new Date(2020, 01, 06).getTime(),
      //               new Date(2021, 01, 06).getTime()
      //             ]
      //           );
      //         }
      //       }
      //     ]]
      // }
      // );

        // var data = {
        //   type: 'scatter',
        //   mode: 'lines', 
        //   name: 'Rel. Val',         
        //   x: date,
        //   y: cal
        // }

        // Plotly.newPlot('relplot', data)

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
            title: 'GE Overview',
            l=0,
            r=0,
            b=0,
            t=0 
        }

        Plotly.newPlot('plot', TSdata, TSlayout);


    })
    
}; 
buildPlot()

// type: 'filter',
// target: 'y',
// operation: '>',
// value: 4

// function buildrv() {

//   Plotly.plot('graph', [{
//     x: x,
//     y: y,
//     type: 'bar'
// }], 
// {
//   title: 'Some stocks'
// }, 
// {
//     modeBarButtons: [[{
//         name: 'June',
//         click: function() {
//           Plotly.relayout('graph',
//             'xaxis.range', 
//             [
//               new Date(2015, 05, 1).getTime(),
//               new Date(2015, 05, 31).getTime()
//             ]
//           );
//         }
//       }, {
//         name: 'July',
//         click: function() {
//           Plotly.relayout('graph',
//             'xaxis.range', 
//             [
//               new Date(2015, 06, 1).getTime(),
//               new Date(2015, 06, 31).getTime()
//             ]
//           );
//         }
//       }
//     ]]
// }
// );


// # df = px.data.stocks()

// # app = dash.Dash(__name__)

// # app.layout = html.Div([
// #     dcc.Dropdown(
// #         id="ticker",
// #         options=[{"label": x, "value": x} 
// #                  for x in df.columns[1:]],
// #         value=df.columns[1],
// #         clearable=False,
// #     ),
// #     dcc.Graph(id="time-series-chart"),
// # ])

// # @app.callback(
// #     Output("time-series-chart", "figure"), 
// #     [Input("ticker", "value")])
// # def display_time_series(ticker):
// #     fig = px.line(df, x='date', y=ticker)
// #     return fig


// Plotly.d3.csv("GE.csv", function(err, rows){
//   console.log(rows)  
//   // const date = data.map(dates => {return dates.date})
//  {
//   rows.map(function(row) { return row[key]; });
// console.log(rows)  
// }

// var trace1 = {
//   type: "scatter",
//   mode: "lines",
//   x: unpack(rows, 'Date'),
//   y: unpack(rows, 'GE.High'),
//   line: {color: '#17BECF'}
// }

// var trace2 = {
//   type: "scatter",
//   mode: "lines",
//   x: unpack(rows, 'Date'),
//   y: unpack(rows, 'GE.Low'),
//   line: {color: '#7F7F7F'}
// }

// var data = [trace1,trace2];

// var layout = {
//   title: 'Custom Range',
//   xaxis: {
//     range: ['2020-01-02', '2020-12-31'],
//     type: 'date'
//   },
//   yaxis: {
//     autorange: true,
//     range: [86.8700008333, 138.870004167],
//     type: 'linear'
//   }
// };

// Plotly.newPlot('myDiv', data, layout);
// });   
// }
// buildrv()
     

// function unpack(rows, index) {
//     return rows.map(function(row) {
//       return row[index];
//     });
//   }
  
  // Submit Button handler
//   function handleSubmit() {
//     // Prevent the page from refreshing
//     d3.event.preventDefault();
  
//     // Select the input value from the form
//     var stock = d3.select("#stockInput").node().value;
//     console.log(stock);
  
//     // clear the input value
//     d3.select("#stockInput").node().value = "";
  
//     // Build the plot with the new stock
//     buildPlot(stock);
//   }
  
//   function buildPlot(stock) {
//     var apiKey = "ksAyqtZLBLQ6Qz4svXsz";
  
//     var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;
  
//     d3.json(url).then(function(data) {
  
//       // Grab values from the response json object to build the plots
//     //   var name = data.dataset.name;
//     //   var stock = data.dataset.dataset_code;
//     //   var startDate = data.dataset.start_date;
//     //   var endDate = data.dataset.end_date;
//     //   var dates = unpack(data.dataset.data, 0);
//     //   var closingPrices = unpack(data.dataset.data, 4);
//     //   var low = unpack(data.dataset.data, 3);
//     //   var high = unpack(data.dataset.data, 2);
//     //   var openingPrices = unpack(data.dataset.data, 1);
//       // @TODO: Unpack the open, close, high, and low prices


//       var trace1 = {
//         type: "scatter",
//         mode: "lines",
//         name: name,
//         x: date,
//         y: closingPrices,
//         line: {
//           color: "#17BECF"
//         }
//       };
  
//       // Candlestick Trace
//       var trace2 = {
//         type: "candlestick",
//         x: date,
//         high: high,
//         low: low,
//         open: openingPrices,
//         close: closingPrices
//         // @TODO: YOUR CODE HERE
//       };
  
//       var data = [trace1, trace2];
  
//       var layout = {
//         title: `${stock} closing prices`,
//         xaxis: {
//           range: [startDate, endDate 14:30'],
//           type: "date"
//         },
//         yaxis: {
//           autorange: true,
//           type: "linear"
//         }
//       };
  
//       Plotly.newPlot("plot", data, layout); 
//     });
//   }
  
//   // Add event listener for submit button
//   d3.select("#submit").on("click", handleSubmit);


        // var trace1 = {
        //     x: [0, 1, 2, 3, 4, 5, 6],
        //     y: [1, 9, 4, 7, 5, 2, 4],
        //     mode: 'lines+markers',
        //     type: 'scatter'
        //   };
        //   var data = [trace1];
          
        //   var layout = {
        //       title: 'Display the Edit Chart Link'
        //   };
          
        //   var config = {
        //     showLink: true,
        //     plotlyServerURL: "https://chart-studio.plotly.com"
        //   };
          
        //   Plotly.newPlot('myDiv', data, layout, config);