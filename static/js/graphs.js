var select = d3.select("#selDataset");
select.on("change", function () {
  d3.event.preventDefault();

  // Select the input value from the form
  var stock = d3.select("#selDataset").node().value;
  console.log(stock);

  // clear the input value
  d3.select("#selDataset").node().value = "";

  // Build the plot with the new stock
  buildHON(stock);
})
  
//   d3.select('#opts')
//   .on('change', function() {
//     var newData = eval(d3.select(this).property('value'));
//     buildHON(newData);
// }); 
// Submit Button handler
// function select() {
//   // Prevent the page from refreshing
//   d3.event.preventDefault();

//   // Select the input value from the form
//   // var stock = d3.select("#selDataset").node().value;
//   var stock = d3.select("#selDataset").property().value;
  
//   console.log(stock);

//   // clear the input value
//   // d3.select("#selDataset").node().value = "";

//   // Build the plot with the new stock
//   buildHON(stock);
// }
// select()

function buildHON(stock) {
    d3.json(stock).then((data) => {
        // d3.json(`/metadata/${sample}`).then((data) 
        // console.log(data)
        // console.log((data[0]))
        //var filteredData = samples.filter(event => parseInt(event.id) === parseInt(value))[0];   
        const volume = data.map(vol => { return parseInt(vol.volume)})   
        const timestamp = data.map(time => { return parseInt(time.timestamp)})      
        const timestamp2 = data.map(time => { return parseInt(time.timestamp)})      
        const high = data.map(high => {return high.high})
        const low = data.map(low => {return low.low})
        const openPrice = data.map(openp => {return openp.open})
        const closingPrice = data.map(close => {return close.close})
        const date = data.map(dates => {return dates.date})
        const cal = data.map(lp => {return lp.cal})
        // console.log(date)        
        console.log(cal)
        console.log(closingPrice)


        // var data = {
        //   type: 'scatter',
        //   mode: 'lines', 
        //   name: 'Rel. Val on close',         
        //   x: date,
        //   y: cal
        // }

        // Plotly.newPlot('rplot', data);

        var TStrace1 = 
            {
            type: "scatter",
            mode: "lines",
            name: 'HON high',
            x: timestamp,
            y: high,
            marker: {color: '#17BECF'}
        }
    
        var TStrace2 = 
            {
            type: "scatter",
            mode: "lines",
            name: 'HON low',
            x: timestamp,
            y: low,
            line: {color: '#7F7F7F'}
        }
    
        var TSdata = [TStrace1, TStrace2];
          
        var TSlayout = {
            title: 'HON Overview',
        }

        Plotly.newPlot('plot', TSdata, TSlayout);


        let CND1 ={
            x: date,
            close: closingPrice,
            decreasing: {line: {color: '#7F7F7F'}},
            high: high,
            increasing: {line: {color: "#17BECF"}},
            line: {color: 'rgba(31,119,180,1)'},
            low: low,
            open: openPrice,
            type: "candlestick",
            xaxis: "x", 
            yaxis: "y"             
        }
    
        // Candlestick Trace

    
        let CNDdata = [CND1];
    
        let CNDlayout = {
            dragmode: 'zoom', 
            margin: {
              r: 10, 
              t: 25, 
              b: 40, 
              l: 60
            }, 
            showlegend: false, 
            xaxis: {
              autorange: true, 
              domain: [0, 1], 
              range: ['2020-01-02 14:30', '2020-12-31 14:30'], 
              rangeslider: {range: ['2020-01-02 14:30', '2020-12-31 14:30']}, 
              title: 'Date', 
              type: 'date'
            }, 
            yaxis: {
              autorange: true, 
              domain: [0, 1], 
              range: [0, 20], 
              type: 'linear'
            }
        };
        // let CNDlayout = {
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
        //                 width: 0
        //             }
        //         }
        //       ]
        //   }
          
        
    
        Plotly.newPlot("plot2", CNDdata, CNDlayout); 

/****************** Plotly.plot(graph..) is plotting the lines on the same graph *********************************************************************************************/ 

        Plotly.newPlot('graph', [{
          x: date,
          y: cal,
          type: 'line'
      }], 
      {
        title: 'Some stocks'
      }, 
      {
          modeBarButtons: [[{
              name: 'June',
              click: function() {
                Plotly.relayout('graph',
                  'xaxis.range', 
                  [
                    new Date(2020, 01, 06).getTime(),
                    new Date(2021, 01, 06).getTime()
                  ]
                );
              }
            }, {
              name: 'July',
              click: function() {
                Plotly.relayout('graph',
                  'xaxis.range', 
                  [
                    new Date(2020, 01, 06).getTime(),
                    new Date(2021, 01, 06).getTime()
                  ]
                );
              }
            }
          ]]
      }
      );


    // buildHON (stock)
    })
    
}; 

