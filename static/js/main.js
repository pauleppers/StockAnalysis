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

// loadTasks()

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
//         x: timestamp,
//         y: closingPrices,
//         line: {
//           color: "#17BECF"
//         }
//       };
  
//       // Candlestick Trace
//       var trace2 = {
//         type: "candlestick",
//         x: timestamp,
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

  
// function handleSubmit() {
//     d3.event.preventDefault();
//     // Select the input value from the form    
//     var stock = d3.select("#stockInput").node().value;
//     console.log(stock);  
//     // clear the input value
//     d3.select("#stockInput").node().value = "";   
//     // Build the plot with the new stock
//     buildPlot(stock);  
//     function buildPlot(stock) {}
function buildPlot() {
    d3.json('/api/candlestick').then((data) => {
        // d3.json(`/metadata/${sample}`).then((data) 
        // console.log(data)
        // console.log((data[0]))
        //var filteredData = samples.filter(event => parseInt(event.id) === parseInt(value))[0];   
        var volume = data.map(vol => { return parseInt(vol.volume)})   
        var timestamp = data.map(time => { return parseInt(time.timestamp)})   
        var dated = data.map(dated => { return parseInt(dated.date)})   
        var high = data.map(high => {return high.high})
        var low = data.map(low => {return low.low})
        var openPrice = data.map(openp => {return openp.open})
        var closingPrice = data.map(close => {return close.close})
        var date = data.map(dates => {return dates.date})
        var date2 = data.map(dates => {return dates.date})
        // let date2 = new Date()
        //parse JSON formatted date to javascript date object
        var bdate = new Date(parseInt(date2.substr(6)));
        var bdate2 = new Date(parseInt(date2.substr(6)));
        var date3 = formatDate("yyyy-mm-dd", bdate2)
        //format display date (e.g. 04/10/2012)
        var displayDate = $.datepicker.formatDate("yyyy-mm-dd", bdate);
        console.log(date)
        console.log(dated)
        console.log(displayDate)
        console.log(date3)

        //console.log(high)
        //var volume = parseInt(data.volume);
        //var high = parseInt(data.high);

        // let TStrace1 = [
        //     {
        //     type: "scatter",
        //     mode: "lines",
        //     name: 'GE high',
        //     x: timestamp,
        //     y: high,
        //     marker: {color: '#17BECF'}
        //     }
        // ]
        // let TStrace2 = [
        //     {
        //     type: "scatter",
        //     mode: "lines",
        //     name: 'GE low',
        //     x: timestamp,
        //     y: low,
        //     line: {color: '#7F7F7F'}
        //     }
        // ]
        // let TSdata = [[TStrace1, TStrace2]];
          
        // let TSlayout = [
        //     {
        //     title: 'GE Overview',
        //   }
        // ]
         
        // Plotly.newPlot('plot', TSdata, TSlayout);


        // let CND1 = [
        //     {
        //     x: date,
        //     y: closingPrice,
        //     decreasing: {line: {color: '#7F7F7F'}},
        //     high: high,
        //     increasing: {line: {color: "#17BECF"}},
        //     line: {color: 'rgba(31,119,180,1)'},
        //     low: low,
        //     open: openPrice,
        //     type: "candlestick",
        //     xaxis: "x", 
        //     yaxis: "y"             
        //   }
        // ]
    
        // // Candlestick Trace
        // // let CND2 = [
        // //     {
        // //     type: "candlestick",
        // //     x: date,
        // //     high: high,
        // //     low: low,
        // //     open: openPrice,
        // //     close: closingPrice
        // //     }
        // // ]
    
        // let CNDdata = [[CND1]];
    
        // // let CNDlayout = [
        // //     {
        // //     title: "GE closing prices",
        // //     xaxis: date,
        // //     yaxis: {
        // //     autorange: true,
        // //     type: "linear"
        // //     }
        // //    }
        // // ]
        // let CNDlayout = [
        //     {
        //     dragmode: 'zoom', 
        //     margin: {
        //       r: 10, 
        //       t: 25, 
        //       b: 40, 
        //       l: 60
        //     }, 
        //     showlegend: false, 
        //     xaxis: {
        //       autorange: true, 
        //       rangeslider: {range: ['2020-01-02', '2020-12-31']}, 
        //       title: 'Date', 
        //       type: 'date'
        //     }, 
        //     yaxis: {
        //       autorange: true, 
        //       type: 'linear'
        //     },
            
        //     annotations: [
        //       {
        //         x: '2017-01-31',
        //         y: 0.9,
        //         xref: 'x',
        //         yref: 'paper',
        //         text: 'largest movement',
        //         font: {color: 'magenta'},
        //         showarrow: true,
        //         xanchor: 'right',
        //         ax: -20,
        //         ay: 0
        //       }
        //     ],
            
        //     shapes: [
        //         {
        //             type: 'rect',
        //             xref: 'x',
        //             yref: 'paper',
        //             x0: '2020-01-02',
        //             y0: 0,
        //             x1: '2020-12-31',
        //             y1: 1,
        //             fillcolor: '#d3d3d3',
        //             opacity: 0.2,
        //             line: {
        //                 width: 0.5
        //             }
        //         }
        //       ]
        //   }
        // ]
          
        
    
        // Plotly.newPlot("plot2", CNDdata, CNDlayout); 

    })
}; 
buildPlot()



/*********graph works in build plot************************** */
// var trace1 = {
//     type: "bar",
//     name: 'GE volume',
//     x: high,
//     y: volume,
//     marker: {color: '#17BECF'}
//   }



  // Add event listener for submit button
// d3.select("#submit").on("click", handleSubmit); 

// function handleSubmit() {
//     // @TODO: YOUR CODE HERE
//     // Prevent the page from refreshing
//     d3.event.preventDefault();
  
//     // Select the input value from the form
//     var input = d3.select("#stockInput");
//     var stock = input.property("value");
  
//     console.log(stock)
//     // clear the input value
//     input.property("value", "");
//     // Build the plot with the new stock
//     buildPlot(stock);
//   }


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