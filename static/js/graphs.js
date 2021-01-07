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
        const symbol = data.map(id => {return id.symbol})[0]
        const id = symbol.toUpperCase()
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
            name: `${id} high`,
            x: date,
            y: high,
            marker: {color: '#17BECF'}
        }
    
        var TStrace2 = 
            {
            type: "scatter",
            mode: "lines",
            name: `${id} low`,
            x: date,
            y: low,
            line: {color: '#7F7F7F'}
        }
    
        var TSdata = [TStrace1, TStrace2];
          
        var TSlayout = {
            title: `${id} Overview`,
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
        title: 'Relative Value Analysis'
      }, 
      {
          modeBarButtons: [[{
              name: 'January',
              click: function() {
                Plotly.relayout('graph',
                  'xaxis.range', 
                  [
                    new Date(2020, 01, 06).getTime(),
                    new Date(2020, 02, 06).getTime()
                  ]
                );
              }
            }, {
              name: 'December',
              click: function() {
                Plotly.relayout('graph',
                  'xaxis.range', 
                  [
                    new Date(2020, 12, 01).getTime(),
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

// function buildRel(stock) {
//   d3.json(stock).then((data) =>{ 
//     const symbol = data.map(id => {return id.symbol})[0]
//     const id = symbol.toUpperCase()
//     `${id}'s Relative Value Analysis Graph`
//     selection.datum(function() { return this.dataset; })
//     Plotly.newPlot('graph', [{
//       x: date,
//       y: cal,
//       type: 'line'
//     }], 
//   {
//   title: 'Relative Value Analysis'
//   }, 
//   {
//     modeBarButtons: [[{
//         name: 'January',
//         click: function() {
//           Plotly.relayout('graph',
//             'xaxis.range', 
//             [
//               new Date(2020, 01, 06).getTime(),
//               new Date(2020, 02, 06).getTime()
//             ]
//           );
//         }
//       }, {
//         name: 'Return?',
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
// });
// }




// chart = {
//   const svg = d3.create("svg")
//       .attr("viewBox", [0, 0, width, height]);

//   const zx = x.copy(); // x, but with a new domain.

//   const line = d3.line()
//       .x(d => zx(d.date))
//       .y(d => y(d.close));

//   const path = svg.append("path")
//       .attr("fill", "none")
//       .attr("stroke", "steelblue")
//       .attr("stroke-width", 1.5)
//       .attr("stroke-miterlimit", 1)
//       .attr("d", line(data));

//   const gx = svg.append("g")
//       .call(xAxis, zx);

//   const gy = svg.append("g")
//       .call(yAxis, y);

//   return Object.assign(svg.node(), {
//     update(domain) {
//       const t = svg.transition().duration(750);
//       zx.domain(domain);
//       gx.transition(t).call(xAxis, zx);
//       path.transition(t).attr("d", line(data));
//     }
//   });
// }
// update = undefined
// update = chart.update(timeframe)
// function init(stock){
//   buildHON(stock[0])


// }
// init()