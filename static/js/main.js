function loadTasks() {
    d3.json('/api/tasks').then((data) => {
        data.forEach(task => {
            var listGroup = d3.select("#tasks")
            var listItem = listGroup.append("li");
            listItem.text(task.description);
            listItem.attr("class", "list-group-item");
        });
    });
    buildPlot()
};

loadTasks()

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
//         x: dates,
//         y: closingPrices,
//         line: {
//           color: "#17BECF"
//         }
//       };
  
//       // Candlestick Trace
//       var trace2 = {
//         type: "candlestick",
//         x: dates,
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
//           range: [startDate, endDate],
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
        console.log(data)
        var volume = parseInt(task.volume);
        var high = parseInt(task.high);

    
        var trace1 = {
            type: "bar",
            name: 'GE volume',
            x: high,
            y: volume,
            marker: {color: '#17BECF'}
          }
          
        //   var trace2 = {
        //     type: "scatter",
        //     mode: "lines",
        //     name: 'GE low',
        //     x: timestamp,
        //     y: low,
        //     line: {color: '#7F7F7F'}
        //   }
          
          var data = [trace1];
          
          var layout = {
            title: 'Basic Time Series',
          };
         
        Plotly.newPlot('plot', data, layout);
    })
}; 
buildPlot()

// function buildPlot() {
//     d3.json('/api/candlestick').then((data) => {
//         console.log(data)
//         var trace1 = {
//             type: "scatter",
//             mode: "lines",
//             name: 'GE high',
//             x: unpack(rows, 'timestamp'),
//             y: unpack(rows, 'ge.high'),
//             line: {color: '#17BECF'}
//           }
          
//           var trace2 = {
//             type: "scatter",
//             mode: "lines",
//             name: 'GE low',
//             x: unpack(rows, 'timestamp'),
//             y: unpack(rows, 'ge.low'),
//             line: {color: '#7F7F7F'}
//           }
          
//           var data = [trace1,trace2];
          
//           var layout = {
//             title: 'Basic Time Series',
//           };
         
//         Plotly.newPlot('plot', data, layout);
//     })
// }; 
// buildPlot()



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