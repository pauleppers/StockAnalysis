var select = d3.select("#selDataset");
select.on("change", function () {
  d3.event.preventDefault();

  // Select the input value from the form
  var stock = d3.select("#selDataset").node().value;
  console.log(stock);

  // clear the input value
  // d3.select("#selDataset").node().value = "";

  // Build the plot with the new stock
  buildHON(stock);
  candlestick(stock);
  // buildtable(stock)
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
function candlestick(stock) {
am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.padding(0, 15, 0, 15);
  
  // Load data
  
  d3.json(stock).then((data) => {
     
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
     
  
  // chart.dataSource.url = "https://www.amcharts.com/wp-content/uploads/assets/stock/MSFT.csv";
  
  // console.log(chart.dataSource.url);
  console.log(data);
  
  chart.data = data;
  // chart.dataSource.parser = new am4core.CSVParser();
  // chart.dataSource.parser.options.useColumnNames = true;
  // chart.dataSource.parser.options.reverse = true;
  
  // the following line makes value axes to be arranged vertically.
  chart.leftAxesContainer.layout = "vertical";
  
  // uncomment this line if you want to change order of axes
  //chart.bottomAxesContainer.reverseOrder = true;
  
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.ticks.template.length = 8;
  dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
  dateAxis.renderer.grid.template.disabled = true;
  dateAxis.renderer.ticks.template.disabled = false;
  dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
  dateAxis.renderer.minLabelPosition = 0.01;
  dateAxis.renderer.maxLabelPosition = 0.99;
  dateAxis.keepSelection = true;
  dateAxis.minHeight = 30;
  
  dateAxis.groupData = true;
  dateAxis.minZoomCount = 5;
  
  // these two lines makes the axis to be initially zoomed-in
  // dateAxis.start = 0.7;
  // dateAxis.keepSelection = true;
  
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.zIndex = 1;
  valueAxis.renderer.baseGrid.disabled = true;
  // height of axis
  valueAxis.height = am4core.percent(65);
  
  valueAxis.renderer.gridContainer.background.fill = am4core.color("#000000");
  valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;
  valueAxis.renderer.inside = true;
  valueAxis.renderer.labels.template.verticalCenter = "bottom";
  valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
  
  //valueAxis.renderer.maxLabelPosition = 0.95;
  valueAxis.renderer.fontSize = "0.8em"
  
  var series = chart.series.push(new am4charts.CandlestickSeries());
  series.dataFields.dateX = "date";
  series.dataFields.openValueY = "open";
  series.dataFields.valueY = "close";
  series.dataFields.lowValueY = "low";
  series.dataFields.highValueY = "high";
  series.clustered = false;
  series.tooltipText = "open: {openValueY.value}\nlow: {lowValueY.value}\nhigh: {highValueY.value}\nclose: {valueY.value}";
  series.name = "MSFT";
  series.defaultState.transitionDuration = 0;
  
  var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis2.tooltip.disabled = true;
  // height of axis
  valueAxis2.height = am4core.percent(35);
  valueAxis2.zIndex = 3
  // this makes gap between panels
  valueAxis2.marginTop = 30;
  valueAxis2.renderer.baseGrid.disabled = true;
  valueAxis2.renderer.inside = true;
  valueAxis2.renderer.labels.template.verticalCenter = "bottom";
  valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
  //valueAxis.renderer.maxLabelPosition = 0.95;
  valueAxis2.renderer.fontSize = "0.8em"
  
  valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
  valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;
  
  var series2 = chart.series.push(new am4charts.ColumnSeries());
  series2.dataFields.dateX = "date";
  series2.clustered = false;
  series2.dataFields.valueY = "volume";
  series2.yAxis = valueAxis2;
  series2.tooltipText = "{valueY.value}";
  series2.name = "Series 2";
  // volume should be summed
  series2.groupFields.valueY = "sum";
  series2.defaultState.transitionDuration = 0;
  
  chart.cursor = new am4charts.XYCursor();
  
  var scrollbarX = new am4charts.XYChartScrollbar();
  
  var sbSeries = chart.series.push(new am4charts.LineSeries());
  sbSeries.dataFields.valueY = "close";
  sbSeries.dataFields.dateX = "date";
  scrollbarX.series.push(sbSeries);
  sbSeries.disabled = true;
  scrollbarX.marginBottom = 20;
  chart.scrollbarX = scrollbarX;
  scrollbarX.scrollbarChart.xAxes.getIndex(0).minHeight = undefined;
  
  
  
  /**
   * Set up external controls
   */
  
  // Date format to be used in input fields
  var inputFieldFormat = "yyyy-MM-dd";
  
  document.getElementById("b1m").addEventListener("click", function() {
    var max = dateAxis.groupMax["day1"];
    var date = new Date(max);
    am4core.time.add(date, "month", -1);
    zoomToDates(date);
  });
  
  document.getElementById("b3m").addEventListener("click", function() {
    var max = dateAxis.groupMax["day1"];
    var date = new Date(max);
    am4core.time.add(date, "month", -3);
    zoomToDates(date);
  });
  
  document.getElementById("b6m").addEventListener("click", function() {
    var max = dateAxis.groupMax["day1"];
    var date = new Date(max);
    am4core.time.add(date, "month", -6);
    zoomToDates(date);
  });
  
  document.getElementById("b1y").addEventListener("click", function() {
    var max = dateAxis.groupMax["day1"];
    var date = new Date(max);
    am4core.time.add(date, "year", -1);
    zoomToDates(date);
  });
  
  document.getElementById("bytd").addEventListener("click", function() {
    var max = dateAxis.groupMax["day1"];
    var date = new Date(max);
    am4core.time.round(date, "year", 1);
    zoomToDates(date);
  });
  
  document.getElementById("bmax").addEventListener("click", function() {
    var min = dateAxis.groupMin["day1"];
    var date = new Date(min);
    zoomToDates(date);
  });
  
  dateAxis.events.on("selectionextremeschanged", function() {
    updateFields();
  });
  
  dateAxis.events.on("extremeschanged", updateFields);
  
  function updateFields() {
    var minZoomed = dateAxis.minZoomed + am4core.time.getDuration(dateAxis.mainBaseInterval.timeUnit, dateAxis.mainBaseInterval.count) * 0.5;
    document.getElementById("fromfield").value = chart.dateFormatter.format(minZoomed, inputFieldFormat);
    document.getElementById("tofield").value = chart.dateFormatter.format(new Date(dateAxis.maxZoomed), inputFieldFormat);
  }
  
  document.getElementById("fromfield").addEventListener("keyup", updateZoom);
  document.getElementById("tofield").addEventListener("keyup", updateZoom);
  
  var zoomTimeout;
  function updateZoom() {
    if (zoomTimeout) {
      clearTimeout(zoomTimeout);
    }
    zoomTimeout = setTimeout(function() {
      var start = document.getElementById("fromfield").value;
      var end = document.getElementById("tofield").value;
      if ((start.length < inputFieldFormat.length) || (end.length < inputFieldFormat.length)) {
        return;
      }
      var startDate = chart.dateFormatter.parse(start, inputFieldFormat);
      var endDate = chart.dateFormatter.parse(end, inputFieldFormat);
  
      if (startDate && endDate) {
        dateAxis.zoomToDates(startDate, endDate);
      }
    }, 500);
  }
  
  function zoomToDates(date) {
    var min = dateAxis.groupMin["day1"];
    var max = dateAxis.groupMax["day1"];
    dateAxis.keepSelection = true;
    //dateAxis.start = (date.getTime() - min)/(max - min);
    //dateAxis.end = 1;
  
    dateAxis.zoom({start:(date.getTime() - min)/(max - min), end:1});
  }
  
  }); // end am4core.ready()
  
  
  });
}


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
  //       var filterData = data.filter(event => (event.symbol) === ("gd"));   
  // console.log(filterData)
  // var GD = []
  // const high2 = filterData.map(high => {return high.high})
  // GD.push(high2)
  // console.log(GD)
  // const symbol2 = filterData.map(id => {return id.symbol})[0]
  // console.log(symbol2)
  // const id = symbol.toUpperCase()

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

// function handleclick(){
//   var GD = d3.select("#stock1").property("value");
//   var HON = d3.select("#Sdropdown").property("value");
//   var RTX= d3.select("#stateid").property("value").toLowerCase().trim();
//   var city = d3.select("#ufocity").property("value").toLowerCase().trim();
//   var country = d3.select("#countryid").property("value").toLowerCase().trim();

//   let filterData = tableData;
//   if (GD) {
//     filterData = filterData.filter(event => (event.symbol) === ("gd"));
//   }
//   if (city) {
//     filterData = filterData.filter(row => row.city === city);
//   }
//   if (state) {
//     filterData = filterData.filter(row => row.state === state);
//   }
//   if (country) {
//     filterData = filterData.filter(row => row.country === country);
//   }
//   if (shape != "option") {
//     filterData = filterData.filter(row => row.shape === shape);
//   };

//   // pop_table(filterData)
//   buildtable(filterData)
// }
// d3.selectAll("#filter-btn").on("click", handleclick);

// function buildtable(stock){
//   d3.json(stock).then((data) => {

//   var filterData = data.filter(event => (event.symbol) === ("gd"));   
//   console.log(filterData)
//   var GD = []
//   const high2 = filterData.map(high => {return high.high})
//   GD.push(high2)
//   console.log(high2)
//   console.log(GD)
//   const symbol2 = filterData.map(id => {return id.symbol})[0]
//   console.log(symbol2)
//   // const id2 = symbol2.toUpperCase()
  
//   var filterData3 = data.filter(event => (event.symbol) === ("hon"));   
//   console.log(filterData3)
//   var HON = []
//   const high3 = filterData3.map(high => {return high.high})
//   HON.push(high3)
//   console.log(high3)
//   console.log(HON)
//   const symbol3 = filterData3.map(id => {return id.symbol})[0]
//   // console.log(symbol3)
//   // const id3 = symbol3.toUpperCase()

//   var filterData4 = data.filter(event => (event.symbol) === ("rtx"));   
//   console.log(filterData4)
//   var RTX = []
//   const high4 = filterData4.map(high => {return high.high})
//   RTX.push(high4)
//   console.log(high4)
//   console.log(RTX)
//   const symbol4 = filterData4.map(id => {return id.symbol})[0]
//   // console.log(symbol4)
//   // const id4 = symbol4.toUpperCase() 

//   })
// }
// am4core.ready(function() {

// // Themes begin
// am4core.useTheme(am4themes_material);
// am4core.useTheme(am4themes_animated);
// // Themes end

// var chart = am4core.create("chartdiv", am4charts.XYChart);
// chart.padding(0, 15, 0, 15);
// chart.colors.step = 3;

// var data = [];
// var price1 = high[0];
// var price2 = high[1];
// var price3 = high[2];
// var quantity = 1000;
// for (var i = 15; i < 3000; i++) {
//   price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
//   price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
//   price3 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);

//   if (price1 < 100) {
//     price1 = 100;
//   }

//   if (price2 < 100) {
//     price2 = 100;
//   }

//   if (price3 < 100) {
//     price3 = 100;
//   }    

//   quantity += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 500);

//   if (quantity < 0) {
//     quantity *= -1;
//   }
//   // data.push({ date: new Date(2000, 0, i), price1: price1, price2:price2, price3:price3, quantity: quantity });
//   data.push({ date: new Date(2000, 0, i), price1: price1, price2:price2, price3:price3, quantity: quantity });
// }


// chart.data = data;
// // the following line makes value axes to be arranged vertically.
// chart.leftAxesContainer.layout = "vertical";

// // uncomment this line if you want to change order of axes
// //chart.bottomAxesContainer.reverseOrder = true;

// var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
// dateAxis.renderer.grid.template.location = 0;
// dateAxis.renderer.ticks.template.length = 8;
// dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
// dateAxis.renderer.grid.template.disabled = true;
// dateAxis.renderer.ticks.template.disabled = false;
// dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
// dateAxis.renderer.minLabelPosition = 0.01;
// dateAxis.renderer.maxLabelPosition = 0.99;
// dateAxis.keepSelection = true;

// dateAxis.groupData = true;
// dateAxis.minZoomCount = 5;

// // these two lines makes the axis to be initially zoomed-in
// // dateAxis.start = 0.7;
// // dateAxis.keepSelection = true;

// var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
// valueAxis.tooltip.disabled = true;
// valueAxis.zIndex = 1;
// valueAxis.renderer.baseGrid.disabled = true;
// // height of axis
// valueAxis.height = am4core.percent(65);

// valueAxis.renderer.gridContainer.background.fill = am4core.color("#000000");
// valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;
// valueAxis.renderer.inside = true;
// valueAxis.renderer.labels.template.verticalCenter = "bottom";
// valueAxis.renderer.labels.template.padding(2, 2, 2, 2);

// //valueAxis.renderer.maxLabelPosition = 0.95;
// valueAxis.renderer.fontSize = "0.8em"

// var series1 = chart.series.push(new am4charts.LineSeries());
// series1.dataFields.dateX = "date";
// series1.dataFields.valueY = "price1";
// series1.dataFields.valueYShow = "changePercent";
// series1.tooltipText = "{name}: {valueY.changePercent.formatNumber('[#0c0]+#.00|[#c00]#.##|0')}%";
// series1.name = "Stock A";
// series1.tooltip.getFillFromObject = false;
// series1.tooltip.getStrokeFromObject = true;
// series1.tooltip.background.fill = am4core.color("#fff");
// series1.tooltip.background.strokeWidth = 2;
// series1.tooltip.label.fill = series1.stroke;

// var series2 = chart.series.push(new am4charts.LineSeries());
// series2.dataFields.dateX = "date";
// series2.dataFields.valueY = "price2";
// series2.dataFields.valueYShow = "changePercent";
// series2.tooltipText = "{name}: {valueY.changePercent.formatNumber('[#0c0]+#.00|[#c00]#.##|0')}%";
// series2.name = "Stock B";
// series2.tooltip.getFillFromObject = false;
// series2.tooltip.getStrokeFromObject = true;
// series2.tooltip.background.fill = am4core.color("#fff");
// series2.tooltip.background.strokeWidth = 2;
// series2.tooltip.label.fill = series2.stroke;

// var series3 = chart.series.push(new am4charts.LineSeries());
// series3.dataFields.dateX = "date";
// series3.dataFields.valueY = "price3";
// series3.dataFields.valueYShow = "changePercent";
// series3.tooltipText = "{name}: {valueY.changePercent.formatNumber('[#0c0]+#.00|[#c00]#.##|0')}%";
// series3.name = "Stock C";
// series3.tooltip.getFillFromObject = false;
// series3.tooltip.getStrokeFromObject = true;
// series3.tooltip.background.fill = am4core.color("#fff");
// series3.tooltip.background.strokeWidth = 2;
// series3.tooltip.label.fill = series3.stroke;

// var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
// valueAxis2.tooltip.disabled = true;
// // height of axis
// valueAxis2.height = am4core.percent(35);
// valueAxis2.zIndex = 3
// // this makes gap between panels
// valueAxis2.marginTop = 30;
// valueAxis2.renderer.baseGrid.disabled = true;
// valueAxis2.renderer.inside = true;
// valueAxis2.renderer.labels.template.verticalCenter = "bottom";
// valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
// //valueAxis.renderer.maxLabelPosition = 0.95;
// valueAxis2.renderer.fontSize = "0.8em";

// valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
// valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;

// var volumeSeries = chart.series.push(new am4charts.StepLineSeries());
// volumeSeries.fillOpacity = 1;
// volumeSeries.fill = series1.stroke;
// volumeSeries.stroke = series1.stroke;
// volumeSeries.dataFields.dateX = "date";
// volumeSeries.dataFields.valueY = "quantity";
// volumeSeries.yAxis = valueAxis2;
// volumeSeries.tooltipText = "Volume: {valueY.value}";
// volumeSeries.name = "Series 2";
// // volume should be summed
// volumeSeries.groupFields.valueY = "sum";
// volumeSeries.tooltip.label.fill = volumeSeries.stroke;
// chart.cursor = new am4charts.XYCursor();

// var scrollbarX = new am4charts.XYChartScrollbar();
// scrollbarX.series.push(series1);
// scrollbarX.marginBottom = 20;
// var sbSeries = scrollbarX.scrollbarChart.series.getIndex(0);
// sbSeries.dataFields.valueYShow = undefined;
// chart.scrollbarX = scrollbarX;

// // Add range selector
// var selector = new am4plugins_rangeSelector.DateAxisRangeSelector();
// selector.container = document.getElementById("controls");
// selector.axis = dateAxis;

// }); // end am4core.ready()


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

// Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function(err, rows){

//     function unpack(rows, key) {
//         return rows.map(function(row) { return row[key]; });
//     }

//     var allCountryNames = unpack(rows, 'country'),
//         allYear = unpack(rows, 'year'),
//         allGdp = unpack(rows, 'gdpPercap'),
//         listofCountries = [],
//         currentCountry,
//         currentGdp = [],
//         currentYear = [];

//     for (var i = 0; i < allCountryNames.length; i++ ){
//         if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
//             listofCountries.push(allCountryNames[i]);
//         }
//     }

//     function getCountryData(chosenCountry) {
//         currentGdp = [];
//         currentYear = [];
//         for (var i = 0 ; i < allCountryNames.length ; i++){
//             if ( allCountryNames[i] === chosenCountry ) {
//                 currentGdp.push(allGdp[i]);
//                 currentYear.push(allYear[i]);
//             }
//         }
//     };

//     // Default Country Data
//     setBubblePlot('Afghanistan');

//     function setBubblePlot(chosenCountry) {
//         getCountryData(chosenCountry);

//         var trace1 = {
//             x: currentYear,
//             y: currentGdp,
//             mode: 'lines+markers',
//             marker: {
//                 size: 12,
//                 opacity: 0.5
//             }
//         };

//         var data = [trace1];

//         var layout = {
//             title:'Line and Scatter Plot',
//             height: 400,
//             width: 480
//         };

//         Plotly.newPlot('myDiv', data, layout);
//     };

//     var innerContainer = document.querySelector('[data-num="0"'),
//         plotEl = innerContainer.querySelector('.plot'),
//         countrySelector = innerContainer.querySelector('.countrydata');

//     function assignOptions(textArray, selector) {
//         for (var i = 0; i < textArray.length;  i++) {
//             var currentOption = document.createElement('option');
//             currentOption.text = textArray[i];
//             selector.appendChild(currentOption);
//         }
//     }

//     assignOptions(listofCountries, countrySelector);

//     function updateCountry(){
//         setBubblePlot(countrySelector.value);
//     }

//     countrySelector.addEventListener('change', updateCountry, false);
// });
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