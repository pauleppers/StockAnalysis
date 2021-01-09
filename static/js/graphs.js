 
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
//   selected = d3.select(this)
  // .selectAll("option:checked")
  // .each(function() { stock.push(this.value)  })
  // console.log(stock)


var submit = d3.select("#combo")

submit.on("click", function(d) {
  var stock = [];
  console.log("utton clicked")
  var select = d3.select("#selDataset");
  d3.event.preventDefault();
  select.selectAll("option:checked").each(function() {
    
    stock.push(this.value)
    console.log(stock)  })

 
  // Select the input value from the form
  // var stock = d3.select("#selDataset").node().value;
  // console.log(stock);

  // clear the input value
  // d3.select("#selDataset").node().value = "";

  // Build the plot with the new stock
  // buildHON(stock);
  // candlestick(stock);
  buildtable(stock)
})
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

  // Build the plot with the new stock
  // buildHON(stock);
  candlestick(stock);
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
  console.log(stockinput)
  var url = "/api/stocks/" + stockinput
  d3.json(url).then((data) => {


    console.log(data)

    result = [] 
    stock.forEach(element => {
      
      result=data[element]
    }) 

am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.padding(0, 15, 0, 15);
  
  // Load data
  
  
  console.log(result);
  
  chart.data = result;
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

function buildtable(stock){
  var stockinput=stock.toString()
  console.log(stockinput)
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
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
// Themes end
  
chart = am4core.create("chartdiv2", am4charts.XYChart);
chart.padding(0, 15, 0, 15);
chart.colors.step = stock.length;


chart.data = graphData;
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






