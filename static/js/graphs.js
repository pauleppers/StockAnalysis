 
//  = d3.onevent("#selDataset")
//  d3.selectAll("option")                // select the element
//  .datum(function() { return this.getAttribute("data-list").split(",")}) // set selection's data based on its data attribute
//  .selectAll("li")                      // create new selection
//      .data((d) => d)                   // set the data from the parent element
//      .enter().append("li")             // create missing elements
//          .text((content) => content);

//  selection.datum(function(GD) { return this.dataset; })


// selection.property({'/api/hon':'HON', '/api/candlestick':'GD'})
// console.log(HON)
// console.log(GD)

// selection.property({'foo': 'bar', 'baz': 'qux'})
// Selection.on(typenames[,listener[,options]])
// Selection.on(click[,listener[,options]])


var chart;

// var select = d3.select("#selDataset");
// select.on("event", function (d) {
//   var stock = [];
//   select = d3.select(this)
  // .selectAll("option:checked")
  // .each(function() { stock.push(this.value)  })
  // console.log(stock)


// var submit = d3.select("#combo2");

// function lineGraph() {


// var stock = [];
// console.log("button clicked")
// var select = d3.select("#selDataset2");
// d3.event.preventDefault();
// select.selectAll("option:checked").each(function() {
  
//   stock.push(this.value)
//   console.log(stock)  })
//   candlestick(stock);
// }

// submit.on("click", lineGraph)

 
  // Select the input value from the form
  // var stock = d3.select("#selDataset").node().value;
  // console.log(stock);

  // clear the input value
  // d3.select("#selDataset").node().value = "";

  // Build the plot with the new stock
  // buildHON(stock);
  // candlestick(stock);
  
// })
 /*********************************************************** */ 
var submit = d3.select("#combo")

submit.on("click", function(d) {
  var stock = [];
  console.log("utton clicked")
  var select = d3.select("#selDataset");
  d3.event.preventDefault();
  select.selectAll("option:checked").each(function() {
    
    stock.push(this.value)
    console.log(stock)  })

  // Build the plot with the new stock
  // buildHON(stock);
  buildtable(stock)
})
/***************************************************************************** */
 /*********************************************************** */ 
 var submit = d3.select("#combo2")

 submit.on("click", function(d) {
   var stock = [];
   console.log("utton clicked")
   var select = d3.select("#selDataset2");
   d3.event.preventDefault();
   select.selectAll("option:checked").each(function() {
     
     stock.push(this.value)
     console.log(stock)  })
    //   var stock = [];
    //  select.on("event", function (d) {
    //     select = d3.select("#selDataset2")
    //     .selectAll("option:checked")
    //     .each(function() { stock.push(this.value)  })

   // Build the plot with the new stock
   // buildHON(stock);
   candlestick(stock)
 })
 /***************************************************************************** */


// var submit = d3.select("#combo3")

// submit.on("click", function(d) {
//   var stock = [];
//   // console.log("utton clicked")
//   var select = d3.select("#selDataset3");
//   d3.event.preventDefault();
//   select.selectAll("option:checked").each(function() {
    
//     stock.push(this.value)
//     console.log(stock)  })

//   // Build the plot with the new stock
//   // buildHON(stock);
//   // candlestick(stock);
//   varianceIndi(stock);
// })
/***************************************************************************** */
var submit = d3.select("#colorChart")

submit.on("click", function(d) {
  var stock = [];
  // console.log("utton clicked")
  var select = d3.select("#selDataset4");
  d3.event.preventDefault();
  select.selectAll("option:checked").each(function() {
    
    stock.push(this.value)
    console.log(stock)  })

  // Build the plot with the new stock

  colorFill(stock);
})
/***************************************************************************** */

// var select2 = d3.selectall("#selDataset");
// select2.on("change", function () {
//   d3.event.preventDefault();

//   // Select the input value from the form
//   var stock2 = d3.selectall("#selDataset").node().value;
//   console.log(stock2);

//   // clear the input value
//   // d3.select("#selDataset").node().value = "";

//   // Build the plot with the new stock
//   // buildHON(stock);
//   buildtable(stock2)
// })
  

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


function candlestick(stock){
  var stockinput=stock.toString()
  // console.log(stockinput)
  var url = "/api/stocks/" + stockinput
  d3.json(url).then((data) => {


    // console.log(data)

    result = [] 
    stock.forEach(element => {
      
      result=data[element]
    }) 

am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.padding(0, 15, 0, 15);
  
  // Load data
  
  
  // console.log(result);
  
  chart.data = result;
  // chart.dataSource.parser = new am4core.CSVParser();
  // chart.dataSource.parser.options.useColumnNames = true;
  // chart.dataSource.parser.options.reverse = true;
  
  // the following line makes value axes to be arranged vertically.
  chart.leftAxesContainer.layout = "vertical";
  
  // var title = chart.titles.create();
  // title.text = "Candlestick Graph";
  // title.fontSize = 25;
  // title.marginBottom = 30;

  var label = chart.chartContainer.createChild(am4core.Label);
  label.text = "Date";
  label.align = "center";

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
  //my creation of the left label 
  valueAxis.title.text = "$"
  valueAxis.fontSize = 20
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
  series.name = "ba";
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
  //series2.tooltipText = "{dateX}: {valueY.value}";

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
  }) 

;
}
candlestick(["gd"])

// function buildHON(stock) {
//     d3.json(stock).then((data) => {
//         // d3.json(`/metadata/${sample}`).then((data) 
//         // console.log(data)
//         // console.log((data[0]))
//         //var filteredData = samples.filter(event => parseInt(event.id) === parseInt(value))[0];   
//         const volume = data.map(vol => { return parseInt(vol.volume)})   
//         const timestamp = data.map(time => { return parseInt(time.timestamp)})      
//         const timestamp2 = data.map(time => { return parseInt(time.timestamp)})      
//         const high = data.map(high => {return high.high})
//         const low = data.map(low => {return low.low})
//         const openPrice = data.map(openp => {return openp.open})
//         const closingPrice = data.map(close => {return close.close})
//         const date = data.map(dates => {return dates.date})
//         const cal = data.map(lp => {return lp.cal})
//         const symbol = data.map(id => {return id.symbol})[0]
//         const id = symbol.toUpperCase()
//         // console.log(date)        
//         console.log(cal)
//         console.log(closingPrice)
//   //       var filterData = data.filter(event => (event.symbol) === ("gd"));   
//   // console.log(filterData)
//   // var GD = []
//   // const high2 = filterData.map(high => {return high.high})
//   // GD.push(high2)
//   // console.log(GD)
//   // const symbol2 = filterData.map(id => {return id.symbol})[0]
//   // console.log(symbol2)
//   // const id = symbol.toUpperCase()

//         // var data = {
//         //   type: 'scatter',
//         //   mode: 'lines', 
//         //   name: 'Rel. Val on close',         
//         //   x: date,
//         //   y: cal
//         // }

//         // Plotly.newPlot('rplot', data);

//         var TStrace1 = 
//             {
//             type: "scatter",
//             mode: "lines",
//             name: `${id} high`,
//             x: date,
//             y: high,
//             marker: {color: '#17BECF'}
//         }
    
//         var TStrace2 = 
//             {
//             type: "scatter",
//             mode: "lines",
//             name: `${id} low`,
//             x: date,
//             y: low,
//             line: {color: '#7F7F7F'}
//         }
    
//         var TSdata = [TStrace1, TStrace2];
          
//         var TSlayout = {
//             title: `${id} Overview`,
//         }

//         Plotly.newPlot('plot', TSdata, TSlayout);


//         let CND1 ={
//             x: date,
//             close: closingPrice,
//             decreasing: {line: {color: '#7F7F7F'}},
//             high: high,
//             increasing: {line: {color: "#17BECF"}},
//             line: {color: 'rgba(31,119,180,1)'},
//             low: low,
//             open: openPrice,
//             type: "candlestick",
//             xaxis: "x", 
//             yaxis: "y"             
//         }
    
//         // Candlestick Trace

    
//         let CNDdata = [CND1];
    
//         let CNDlayout = {
//             dragmode: 'zoom', 
//             margin: {
//               r: 10, 
//               t: 25, 
//               b: 40, 
//               l: 60
//             }, 
//             showlegend: false, 
//             xaxis: {
//               autorange: true, 
//               domain: [0, 1], 
//               range: ['2020-01-02 14:30', '2020-12-31 14:30'], 
//               rangeslider: {range: ['2020-01-02 14:30', '2020-12-31 14:30']}, 
//               title: 'Date', 
//               type: 'date'
//             }, 
//             yaxis: {
//               autorange: true, 
//               domain: [0, 1], 
//               range: [0, 20], 
//               type: 'linear'
//             }
//         };
          
        
    
//         Plotly.newPlot("plot2", CNDdata, CNDlayout); 

// /****************** Plotly.plot(graph..) is plotting the lines on the same graph *********************************************************************************************/ 

//         Plotly.newPlot('graph', [{
//           x: date,
//           y: cal,
//           type: 'line'
//       }], 
//       {
//         title: 'Relative Value Analysis'
//       }, 
//       {
//           modeBarButtons: [[{
//               name: 'January',
//               click: function() {
//                 Plotly.relayout('graph',
//                   'xaxis.range', 
//                   [
//                     new Date(2020, 01, 06).getTime(),
//                     new Date(2020, 02, 06).getTime()
//                   ]
//                 );
//               }
//             }, {
//               name: 'December',
//               click: function() {
//                 Plotly.relayout('graph',
//                   'xaxis.range', 
//                   [
//                     new Date(2020, 12, 01).getTime(),
//                     new Date(2021, 01, 06).getTime()
//                   ]
//                 );
//               }
//             }
//           ]]
//       }
//       );


//     // buildHON (stock)
//     })
    
// }; 

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

function buildtable(stock){
  var stockinput=stock.toString()
  // console.log(stockinput)
  var url = "/api/stocks/" + stockinput
  d3.json(url).then((data) => {
    // console.log(data)
    var graphData=[]
    for (var i=0; i< data[stock[0]].length-1; i++){
      var result = {}
      var date=data[stock[0]][i]['date']
      // console.log(date)
      result["date"]=date
      var volume=0
      for (var x=0; x< stock.length; x++){
        result[stock[x]]=data[stock[x]][i]['high']
        volume +=data[stock[x]][i]['volume']
      }
      result['quantity']=volume
      graphData.push(result)
      // console.log(graphData)
    }

    if (typeof chart !== 'undefined') {
      chart.dispose();
        chart = null
    }
am4core.ready(function() {
  
// Themes begin
// am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end
  
chart = am4core.create("chartdiv2", am4charts.XYChart);
chart.padding(0, 15, 0, 15);
chart.colors.step = stock.length;


chart.data = graphData;
// the following line makes value axes to be arranged vertically.
chart.leftAxesContainer.layout = "vertical";

var label = chart.chartContainer.createChild(am4core.Label);
label.text = "Date";
label.align = "center";
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
//my adding labels to y axis
valueAxis.text = "%change";
valueAxis.fontSize = 20;

//valueAxis.renderer.maxLabelPosition = 0.95;
valueAxis.renderer.fontSize = "0.8em"

var graphStock 

stock.forEach(stk => {

  graphStock= chart.series.push(new am4charts.LineSeries());
  graphStock.dataFields.dateX = "date";
  graphStock.dataFields.valueY = stk;
  graphStock.dataFields.valueYShow = "changePercent";
  graphStock.tooltipText = "{name}: {valueY.changePercent.formatNumber('[#0c0]+#.00|[#c00]#.##|0')}%";
  graphStock.name = stk;
  graphStock.tooltip.getFillFromObject = false;
  graphStock.tooltip.getStrokeFromObject = true;
  graphStock.tooltip.background.fill = am4core.color("#fff");
  graphStock.tooltip.background.strokeWidth = 2;
  graphStock.tooltip.label.fill = graphStock.stroke;

})

// var title = chart.titles.create();
// title.text = "Relative Value Comparison Graph"
// title.fontSize = 25;
// title.marginBottom = 30;



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
valueAxis2.renderer.fontSize = "0.8em";

valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;

var volumeSeries = chart.series.push(new am4charts.StepLineSeries());
volumeSeries.fillOpacity = 1;
volumeSeries.fill = graphStock.stroke;
volumeSeries.stroke = graphStock.stroke;
volumeSeries.dataFields.dateX = "date";
volumeSeries.dataFields.valueY = "quantity";
volumeSeries.yAxis = valueAxis2;
volumeSeries.tooltipText = "volume: {valueY.value}";
volumeSeries.name = "Series 2";
// volume should be summed
volumeSeries.groupFields.valueY = "sum";
volumeSeries.tooltip.label.fill = volumeSeries.stroke;
chart.cursor = new am4charts.XYCursor();

var scrollbarX = new am4charts.XYChartScrollbar();
scrollbarX.series.push(graphStock);
scrollbarX.marginBottom = 20;
var sbSeries = scrollbarX.scrollbarChart.series.getIndex(0);
sbSeries.dataFields.valueYShow = undefined;
chart.scrollbarX = scrollbarX;

// Add range selector
var selector = new am4plugins_rangeSelector.DateAxisRangeSelector();
selector.container = document.getElementById("controls2");
selector.axis = dateAxis;

}) // end am4core.ready()
})

}
buildtable(["ba", "rtx", "lmt"])



// function varianceIndi(stock){
//   var stockinput=stock.toString()
//   console.log(stockinput)
//   var url = "/api/stocks/" + stockinput
//   d3.json(url).then((data) => {


//     // console.log(data)

//     perform = [] 
//     stock.forEach(element => {
      
//       perform=data[element]
//     }) 


// am4core.ready(function() {

// // Themes begin
// am4core.useTheme(am4themes_animated);
// // Themes end

// // Create chart instance
// var chart = am4core.create("chartdiv3", am4charts.XYChart);

// // Add data
// chart.data =perform 
// // [{
// //   "year": "2011",
// //   "value": 600000
// // }, {
// //   "year": "2012",
// //   "value": 900000
// // }, {
// //   "year": "2013",
// //   "value": 180000
// // }];

// // dateAxis.groupData = true
// // date.groupCount = 60

// // Populate data
// for (var i = 0; i < (chart.data.length - 1); i++) {
//   chart.data[i].valueNext = chart.data[i + 1].value;
//   console.log(chart.data[i].value)
// }

// // Create axes
// var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
// categoryAxis.dataFields.category = "date";
// categoryAxis.renderer.grid.template.location = 0;
// categoryAxis.renderer.minGridDistance = 30;

// var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
// valueAxis.min = 0;

// // Create series
// var series = chart.series.push(new am4charts.ColumnSeries());
// series.dataFields.valueY = "open";
// series.dataFields.categoryX = "date";

// // Add series for showing variance arrows
// var series2 = chart.series.push(new am4charts.ColumnSeries());
// series2.dataFields.valueY = "valueNext";
// series2.dataFields.openValueY = "value";
// series2.dataFields.categoryX = "date";
// series2.columns.template.width = 1;
// series2.fill = am4core.color("#555");
// series2.stroke = am4core.color("#555");

// // Add a triangle for arrow tip
// var arrow = series2.bullets.push(new am4core.Triangle);
// arrow.width = 10;
// arrow.height = 10;
// arrow.horizontalCenter = "middle";
// arrow.verticalCenter = "top";
// arrow.dy = -1;

// // Set up a rotation adapter which would rotate the triangle if its a negative change
// arrow.adapter.add("rotation", function(rotation, target) {
//   return getVariancePercent(target.dataItem) < 0 ? 180 : rotation;
// });

// // Set up a rotation adapter which adjusts Y position
// arrow.adapter.add("dy", function(dy, target) {
//   return getVariancePercent(target.dataItem) < 0 ? 1 : dy;
// });

// // Add a label
// var label = series2.bullets.push(new am4core.Label);
// label.padding(10, 10, 10, 10);
// label.text = "";
// label.fill = am4core.color("#0c0");
// label.strokeWidth = 0;
// label.horizontalCenter = "middle";
// label.verticalCenter = "bottom";
// label.fontWeight = "bolder";

// // Adapter for label text which calculates change in percent
// label.adapter.add("textOutput", function(text, target) {
//   var percent = getVariancePercent(target.dataItem);
//   return percent ? percent + "%" : text;
// });

// // Adapter which shifts the label if it's below the variance column
// label.adapter.add("verticalCenter", function(center, target) {
//   return getVariancePercent(target.dataItem) < 0 ? "top" : center;
// });

// // Adapter which changes color of label to red
// label.adapter.add("fill", function(fill, target) {
//   return getVariancePercent(target.dataItem) < 0 ? am4core.color("#c00") : fill;
// });

// function getVariancePercent(dataItem) {
//   if (dataItem) {
//     var value = dataItem.valueY;
//     var openValue = dataItem.openValueY;
//     var change = value - openValue;
//     return Math.round(change / openValue * 100);
//   }
//   return 0;
// }

// }); // end am4core.ready()
//   })
// }

// varianceIndi(["lmt"])



function colorFill(stock){
  var stockinput=stock.toString()
  console.log(stockinput)
  var url = "/api/stocks/" + stockinput
  d3.json(url).then((data) => {


    console.log(data)

    results = [] 
    stock.forEach(element => {
      
      results=data[element]
    }) 


am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv4", am4charts.XYChart);

chart.data = results
//  [{ date: 1577743200000, open: 122, close: 104 },
// { date: 1577829600000, open: 121, close: 70 },
// { date: 1577916000000, open: 101, close: 55 },


var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 60;

dateAxis.groupData = true
dateAxis.groupCount = 120

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;

valueAxis.text = "$ Stock Value"
valueAxis.fontSize = 20;

// creating Title
// var title = chart.titles.create();
// title.text = "Pink = The stock closed lower than it opened; Blue = The stock closed higher than it opened";
// title.fontSize = 25;
// title.marginBottom = 30;


// only for the legend
var iconSeries = chart.series.push(new am4charts.ColumnSeries())
iconSeries.fill = am4core.color("#ec0800");
iconSeries.strokeOpacity = 0;
iconSeries.stroke = am4core.color("#ec0800");
iconSeries.name = "Events";
iconSeries.dataFields.dateX = "date";
iconSeries.dataFields.valueY = "v";

var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.dateX = "date";
series.dataFields.openValueY = "open";
series.dataFields.valueY = "close";
series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
series.sequencedInterpolation = true;
series.stroke = am4core.color("#1b7cb3");
series.strokeWidth = 2;
series.name = "Close";
series.stroke = chart.colors.getIndex(0);
series.fill = series.stroke;
series.fillOpacity = 0.8;

var bullet = series.bullets.push(new am4charts.CircleBullet())
bullet.fill = new am4core.InterfaceColorSet().getFor("background");
bullet.fillOpacity = 1;
bullet.strokeWidth = 2;
bullet.circle.radius = 4;

var series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.dateX = "date";
series2.dataFields.valueY = "open";
series2.sequencedInterpolation = true;
series2.strokeWidth = 2;
series2.tooltip.getFillFromObject = false;
series2.tooltip.getStrokeFromObject = true;
series2.tooltip.label.fill = am4core.color("#000");
series2.name = "Open";
// series2.name = "SP Aggregate usage";
series2.stroke = chart.colors.getIndex(7);
series2.fill = series2.stroke;


var bullet2 = series2.bullets.push(new am4charts.CircleBullet())
bullet2.fill = bullet.fill;
bullet2.fillOpacity = 1;
bullet2.strokeWidth = 2;
bullet2.circle.radius = 4;

chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;
chart.scrollbarX = new am4core.Scrollbar();

var negativeRange;

// create ranges
var negativeRange;

// create ranges
chart.events.on("datavalidated", function() {
  series.dataItems.each(function(s1DataItem) {
    var s1PreviousDataItem;
    var s2PreviousDataItem;

    var s2DataItem = series2.dataItems.getIndex(s1DataItem.index);

    if (s1DataItem.index > 0) {
      s1PreviousDataItem = series.dataItems.getIndex(s1DataItem.index - 1);
      s2PreviousDataItem = series2.dataItems.getIndex(s1DataItem.index - 1);
    }

    var startTime = am4core.time.round(new Date(s1DataItem.dateX.getTime()), dateAxis.baseInterval.timeUnit, dateAxis.baseInterval.count).getTime();

    // intersections
    if (s1PreviousDataItem && s2PreviousDataItem) {
      var x0 = am4core.time.round(new Date(s1PreviousDataItem.dateX.getTime()), dateAxis.baseInterval.timeUnit, dateAxis.baseInterval.count).getTime() + dateAxis.baseDuration / 2;
      var y01 = s1PreviousDataItem.valueY;
      var y02 = s2PreviousDataItem.valueY;

      var x1 = startTime + dateAxis.baseDuration / 2;
      var y11 = s1DataItem.valueY;
      var y12 = s2DataItem.valueY;

      var intersection = am4core.math.getLineIntersection({ x: x0, y: y01 }, { x: x1, y: y11 }, { x: x0, y: y02 }, { x: x1, y: y12 });

      startTime = Math.round(intersection.x);
    }

    // start range here
    if (s2DataItem.valueY > s1DataItem.valueY) {
      if (!negativeRange) {
        negativeRange = dateAxis.createSeriesRange(series);
        negativeRange.date = new Date(startTime);
        negativeRange.contents.fill = series2.fill;
        negativeRange.contents.fillOpacity = 0.8;
      }
    }
    else {
      // if negative range started
      if (negativeRange) {
        negativeRange.endDate = new Date(startTime);
      }
      negativeRange = undefined;
    }
    // end if last
    if (s1DataItem.index == series.dataItems.length - 1) {
      if (negativeRange) {
        negativeRange.endDate = new Date(s1DataItem.dateX.getTime() + dateAxis.baseDuration / 2);
        negativeRange = undefined;
      }
    }
  })
})

// var hoverState = series2.states.create("hover");
// hoverState.properties.strokeWidth = 3;

// var dimmed = series2.states.create("dimmed");
// dimmed.properties.stroke = am4core.color("#dadada");

chart.legend = new am4charts.Legend();
chart.legend.position = "right";
chart.legend.scrollable = true;
chart.legend.itemContainers.template.events.on("over", function(event) {
  processOver(event.target.dataItem.dataContext);
})

chart.legend.itemContainers.template.events.on("out", function(event) {
  processOut(event.target.dataItem.dataContext);
})

function processOver(hoveredSeries) {
  hoveredSeries.toFront();

  hoveredSeries.segments.each(function(segment) {
    segment.setState("hover");
  })

  chart.series.each(function(series) {
    if (series != hoveredSeries) {
      series.segments.each(function(segment) {
        segment.setState("dimmed");
      })
      series.bulletsContainer.setState("dimmed");
    }
  });
}

function processOut(hoveredSeries) {
  chart.series.each(function(series) {
    series.segments.each(function(segment) {
      segment.setState("default");
    })
    series.bulletsContainer.setState("default");
  });
}



}); // end am4core.ready()

})
}
// colorFill(["noc"])



/*************Start of wordCloud function****************************************************************************************** */
// am4core.ready(function() {

//   // Themes begin
//   am4core.useTheme(am4themes_dark);
//   am4core.useTheme(am4themes_animated);
//   // Themes end
  
//   var chart = am4core.create("chartdiv5", am4plugins_wordCloud.WordCloud);
//   var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
  
//   series.accuracy = 4;
//   series.step = 15;
//   series.rotationThreshold = 0.7;
//   series.maxCount = 200;
//   series.minWordLength = 2;
//   series.labels.template.margin(6,6,6,6);
//   series.maxFontSize = am4core.percent(45);
  
//   series.text = "stockData Symbol BA Company, Boeing Co, Headquarters Chicago IL LMT Lockheed Martin Bethesda MD NOC Northrop Grumman, Falls Church, VA RTX Raytheon Technologies Waltham MA GD [General Dynamics] Reston VA HON Honeywell Charlotte NC."; 
  
//   series.colors = new am4core.ColorSet();
//   series.colors.passOptions = {}; // makes it loop
  
//   //series.labelsContainer.rotation = 45;
//   series.angles = [0,-90];
//   series.fontWeight = "700"
  
//   setInterval(function () {
//     series.dataItems.getIndex(Math.round(Math.random() * (series.dataItems.length - 1))).setValue("value", Math.round(Math.random() * 10));
//    }, 10000)
  
//   }); // end am4core.ready()

/**************end of wordCloud function *************************** */





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

//       }
//     ]]
// }
// );
// });
// }






